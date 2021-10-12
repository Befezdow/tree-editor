import {CacheTreeNode, ChainError, ShortTreeNode, TreeNode} from 'types';
import {getBranch, updateBranch} from 'utils';

const defaultData: Record<string, TreeNode> = {
    node1: {
        value: 'node1',
        nodes: {
            node2: {
                value: 'node2',
                nodes: {
                    node3: {
                        value: 'node3',
                        nodes: {
                            node4: {
                                value: 'node4',
                                nodes: {
                                    node5: {
                                        value: 'node5',
                                        nodes: {},
                                    },
                                },
                            },
                        },
                    },
                },
            },
            node6: {
                value: 'node6',
                nodes: {
                    node7: {
                        value: 'node7',
                        nodes: {
                            node8: {
                                value: 'node8',
                                disabled: true,
                                nodes: {
                                    node9: {
                                        value: 'node9',
                                        nodes: {},
                                    },
                                },
                            },
                        },
                    },
                },
            },
            node10: {
                value: 'node10',
                nodes: {
                    node11: {
                        value: 'node11',
                        nodes: {},
                    },
                },
            },
            node12: {
                value: 'node12',
                disabled: true,
                nodes: {},
            },
        },
    },
};

const getDefaultData = (): Record<string, TreeNode> => {
    return JSON.parse(JSON.stringify(defaultData));
};

export class Database {
    private static data: TreeNode = {value: null, nodes: getDefaultData()};

    static reset(): void {
        Database.data = {value: null, nodes: getDefaultData()};
        console.log(Database.data);
    }

    static update(cacheRootNode: CacheTreeNode): void {
        Object.entries(cacheRootNode.nodes).forEach(([nodeId, node]) => {
            const dbTreeNode = getBranch(Database.data, [...node.originalParentIdsChain!, nodeId]);
            updateBranch(node, dbTreeNode);
        });
    }

    static getData(): TreeNode {
        return Database.data;
    }

    static getElement(idsChain: string[]): {node: ShortTreeNode; idsChain: string[]} {
        if (idsChain.length == 0) {
            throw new ChainError('IDs chain is empty', idsChain);
        }

        let neededNode = Database.data;
        idsChain.forEach((elem) => {
            const tempNode = neededNode.nodes[elem];
            if (tempNode !== undefined) {
                neededNode = tempNode;
            } else {
                throw new ChainError('Invalid IDs chain', idsChain);
            }
        });

        return {node: neededNode, idsChain};
    }
}
