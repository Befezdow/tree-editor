export interface ShortTreeNode {
    value: string | null; // null for root node
    disabled?: boolean;
}

export interface TreeNode extends ShortTreeNode {
    nodes: Record<string, TreeNode>;
}

export interface CacheTreeNode extends Omit<TreeNode, 'nodes'> {
    parentId: string | null;
    nodes: Record<string, CacheTreeNode>;
}

export class ChainError extends Error {
    chain: string[];

    constructor(message: string, idsChain: string[]) {
        super(message); // (1)
        this.chain = idsChain;
    }
}
