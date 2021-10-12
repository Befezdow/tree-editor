import {CacheTreeNode, TreeNode} from './types';

export const getBranch = (rootNode: TreeNode, idsChain: string[], strict = false): TreeNode => {
    let result = rootNode;
    for (const elem of idsChain) {
        const tempNode = result.nodes[elem];

        if (tempNode !== undefined) {
            result = tempNode;
        } else {
            result = rootNode;
            if (strict) {
                break;
            }
        }
    }
    return result;
};

export const mapBranch = (node: CacheTreeNode): TreeNode => {
    return {
        value: node.value,
        disabled: node.disabled,
        nodes: Object.fromEntries(
            Object.entries(node.nodes).map(([nodeId, node]) => [nodeId, mapBranch(node)]),
        ),
    };
};

export const updateBranch = (source: CacheTreeNode, target: TreeNode): void => {
    if (source.disabled) {
        target.disabled = true;
        return;
    }

    target.value = source.value;

    Object.entries(source.nodes).forEach(([nodeId, node]) => {
        const dbTreeNode = target.nodes[nodeId];
        if (dbTreeNode === undefined) {
            target.nodes[nodeId] = mapBranch(node);
        } else {
            updateBranch(node, dbTreeNode);
        }
    });
};
