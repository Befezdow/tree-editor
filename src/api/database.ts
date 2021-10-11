import {ChainError, ShortTreeNode, TreeNode} from 'types';

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
                nodes: {},
            },
        },
    },
};

export class Database {
    static data: TreeNode = {value: null, nodes: defaultData};

    static reset(): void {
        Database.data = {value: null, nodes: defaultData};
    }

    static update(): void {
        // TODO
    }

    static getFullData(): Record<string, TreeNode> {
        return Database.data.nodes;
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
