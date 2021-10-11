import {forward} from 'effector';

import {CacheTreeNode, ChainError} from 'types';
import {cacheData$, editorReset, elementPulled, pullElementFromDbFx, resetDbFx} from './index';

cacheData$
    .on(pullElementFromDbFx.doneData, (state, payload) => {
        const rootNode = state.innerData;

        // get id of new node and chain of IDs to its parent
        const parentIdsChain = payload.idsChain;
        const [newNodeId] = parentIdsChain.splice(-1);

        // get parent node of new node
        // TODO можно оптимизировать путем хранения и отсечения из parentIdsChain максимального общего префикса всех нод
        let newNodeParent = rootNode;
        for (const elem of parentIdsChain) {
            const tempNode = newNodeParent.nodes[elem];

            if (tempNode !== undefined) {
                newNodeParent = tempNode;
            } else {
                if (newNodeParent !== rootNode) {
                    newNodeParent = rootNode;
                    break;
                }
            }
        }

        const sameNodeInCache = newNodeParent.nodes[newNodeId];
        if (sameNodeInCache === undefined) {
            // if node is not presented in cache

            // add new node to the cache
            const parentId = parentIdsChain[parentIdsChain.length - 1]; // get ID of parent node
            const newNode: CacheTreeNode = {...payload.node, parentId, nodes: {}};
            newNodeParent.nodes[newNodeId] = newNode;

            // check siblings for children of new node
            Object.keys(rootNode.nodes).forEach((elem) => {
                const parentlessNode = rootNode.nodes[elem];
                if (parentlessNode.parentId === newNodeId) {
                    delete rootNode.nodes[elem];
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
        innerData: {value: null, parentId: null, nodes: {}},
    }));

forward({from: elementPulled, to: pullElementFromDbFx});
forward({from: editorReset, to: resetDbFx});

pullElementFromDbFx.failData.watch((error) => {
    const chainError = error as ChainError;
    console.error(chainError.message, chainError.chain);
});
