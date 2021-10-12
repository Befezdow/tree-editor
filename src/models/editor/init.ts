import {combine, forward, sample} from 'effector';

import {CacheTreeNode, ChainError} from 'types';
import {getBranch} from 'utils';
import {Database} from 'api/database';
import {
    applyChanges,
    cacheData$,
    cacheSelectedIdsChain$,
    cacheSelectedReset,
    dbData$,
    dbSelectedIdsChain$,
    EditorGate,
    editorReset,
    elementDeleted,
    elementPulled,
    pullElementFromDbFx,
    resetDbFx,
    updateDbFx,
} from './index';

// database

dbData$.on([EditorGate.open, updateDbFx.done, resetDbFx.done], () => ({
    innerData: Database.getData(),
}));
dbSelectedIdsChain$.reset(pullElementFromDbFx.done, editorReset);

forward({from: editorReset, to: resetDbFx});

sample({
    clock: elementPulled,
    source: dbSelectedIdsChain$,
    target: pullElementFromDbFx,
});

sample({
    clock: applyChanges,
    source: cacheData$.map((state) => state.innerData),
    target: updateDbFx,
});

pullElementFromDbFx.failData.watch((error) => {
    const chainError = error as ChainError;
    console.error(chainError.message, chainError.chain);
});

// cache

cacheData$
    .on(pullElementFromDbFx.doneData, (state, payload) => {
        const rootNode = state.innerData;

        // get id of new node and chain of IDs to its parent
        const parentIdsChain = payload.idsChain.slice(0, -1);
        const newNodeId = payload.idsChain[payload.idsChain.length - 1];

        const newNodeParent = getBranch(rootNode, parentIdsChain);

        const sameNodeInCache = newNodeParent.nodes[newNodeId];
        if (sameNodeInCache === undefined) {
            // if node is not presented in cache

            // add new node to the cache
            const newNode: CacheTreeNode = {
                ...payload.node,
                originalParentIdsChain: parentIdsChain,
                nodes: {},
            };
            newNodeParent.nodes[newNodeId] = newNode;

            // check siblings for children of new node
            Object.keys(rootNode.nodes).forEach((elem) => {
                const parentlessNode = rootNode.nodes[elem];
                const idsChain = parentlessNode.originalParentIdsChain!; // ! because all parentless nodes have that prop
                if (idsChain[idsChain.length - 1] === newNodeId) {
                    delete rootNode.nodes[elem];
                    parentlessNode.originalParentIdsChain = undefined;
                    newNode.nodes[elem] = parentlessNode;
                }
            });
        } else {
            // if node presented in cache
            console.error('Pulled node already in the cache');
        }

        return {innerData: rootNode};
    })
    .on(editorReset, () => ({
        innerData: {value: null, nodes: {}},
    }));
cacheSelectedIdsChain$.reset(cacheSelectedReset, editorReset);

sample({
    clock: elementDeleted,
    source: combine({data: cacheData$, idsChain: cacheSelectedIdsChain$}),
    fn: ({data, idsChain}) => {
        const rootNode = data.innerData;
        const deletedNode = getBranch(rootNode, idsChain, true);
        if (deletedNode === rootNode) {
            console.error('Delete error - cant access element', idsChain);
        }

        deletedNode.disabled = true;

        return {innerData: rootNode};
    },
    target: [cacheData$, cacheSelectedReset],
});
