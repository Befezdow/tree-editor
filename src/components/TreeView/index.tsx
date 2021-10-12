import React, {ReactElement} from 'react';

import {TreeNode} from 'types';
import {TreeElement} from 'components/TreeElement';
import {ElementsContainer, Root} from './styled';

export interface TreeViewProps {
    data: Record<string, TreeNode>;
    onElementSelected: (idsChain: string[]) => void;
    selectedId?: string;
    className?: string;
}

export const TreeView = ({
    data,
    onElementSelected,
    selectedId,
    className,
}: TreeViewProps): ReactElement => (
    <Root className={className}>
        <ElementsContainer>
            {Object.entries(data).map(([key, value]) => (
                <TreeViewElement
                    key={key}
                    data={value}
                    nestingLevel={0}
                    keysChain={[key]}
                    onSelected={onElementSelected}
                    selectedId={selectedId}
                    isParentDisabled={false}
                />
            ))}
        </ElementsContainer>
    </Root>
);

const TreeViewElement = ({
    data,
    keysChain,
    nestingLevel,
    onSelected,
    selectedId,
    isParentDisabled,
}: {
    data: TreeNode;
    keysChain: string[];
    nestingLevel: number;
    onSelected: (idsChain: string[]) => void;
    isParentDisabled: boolean;
    selectedId?: string;
}): ReactElement => {
    const isDisabled = isParentDisabled || !!data.disabled;

    return (
        <>
            <TreeElement
                nestingLevel={nestingLevel}
                onClick={() => !data.disabled && onSelected(keysChain)}
                isSelected={keysChain[keysChain.length - 1] === selectedId}
                isDisabled={isDisabled}
            >
                {data.value}
            </TreeElement>
            {Object.entries(data.nodes).map(([key, value]) => (
                <TreeViewElement
                    key={key}
                    data={value}
                    nestingLevel={nestingLevel + 1}
                    keysChain={[...keysChain, key]}
                    onSelected={onSelected}
                    selectedId={selectedId}
                    isParentDisabled={isDisabled}
                />
            ))}
        </>
    );
};
