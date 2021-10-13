import {combine, forward, guard, sample} from 'effector';

import {CacheTreeNode, ChainError} from 'types';
import {getBranch} from 'utils';
import {Database} from 'api/database';
import {
    applyChanges,
    cacheData$,
    cacheEditing$,
    cacheEditingReset,
    cacheSelectedId$,
    cacheSelectedIdsChain$,
    cacheSelectedReset,
    dbData$,
    dbSelectedIdsChain$,
    EditorGate,
    editorReset,
    elementAdded,
    elementDeleted,
    elementEditEnded,
    elementEditStarted,
    elementPulled,
    newElementCreated,
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
                // ! because all parentless nodes should have that prop
                const idsChain = parentlessNode.originalParentIdsChain!;
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
    .on(newElementCreated, (state, payload) => {
        const rootNode = state.innerData;
        const parentNode = getBranch(rootNode, payload.parentIdsChain, true);
        parentNode.nodes[payload.newNodeId] = payload.newNode;

        return {innerData: rootNode};
    })
    .on(editorReset, () => ({
        innerData: {value: null, nodes: {}},
    }));
cacheSelectedIdsChain$
    .on(newElementCreated, (state, payload) => [...payload.parentIdsChain, payload.newNodeId])
    .reset(cacheSelectedReset, editorReset);
cacheEditing$
    .on(newElementCreated, () => true)
    .reset(cacheEditingReset, cacheSelectedReset, editorReset);

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

guard({
    clock: elementEditStarted,
    source: cacheSelectedId$.map((source) => source !== null),
    filter: (source: boolean) => source,
    target: cacheEditing$,
});

sample({
    clock: elementEditEnded,
    source: combine({data: cacheData$, idsChain: cacheSelectedIdsChain$}),
    fn: ({data, idsChain}, payload) => {
        const rootNode = data.innerData;
        const editedNode = getBranch(rootNode, idsChain, true);
        if (editedNode === rootNode) {
            console.error('Edit error - cant access element', idsChain);
        }

        editedNode.value = payload;

        return {innerData: rootNode};
    },
    target: [cacheData$, cacheEditingReset],
});

sample({
    clock: elementAdded,
    source: cacheSelectedIdsChain$,
    fn: (idsChain) => {
        const newNodeId = Database.getNewId();
        const newNode: CacheTreeNode = {
            value: 'default',
            originalParentIdsChain: idsChain.length === 0 ? [] : undefined,
            nodes: {},
        };

        return {
            parentIdsChain: idsChain,
            newNodeId,
            newNode,
        };
    },
    target: newElementCreated,
});
