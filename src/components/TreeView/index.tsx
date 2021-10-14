import React, {ReactElement} from 'react';

import {TreeNode} from 'types';
import {TreeElement} from 'components/TreeElement';
import {ElementsContainer, Root} from './styled';

export interface TreeViewProps {
    data: Record<string, TreeNode>;
    onElementSelected: (idsChain: string[]) => void;
    onFinishEditing?: (value: string) => void;
    selectedId?: string;
    isEditing?: boolean;
    className?: string;
}

export const TreeView = ({
    data,
    onElementSelected,
    selectedId,
    isEditing,
    onFinishEditing,
    className,
}: TreeViewProps): ReactElement => (
    <Root className={className} onClick={() => onElementSelected([])}>
        <ElementsContainer>
            {Object.entries(data).map(([key, value]) => (
                <TreeViewElement
                    key={key}
                    data={value}
                    nestingLevel={0}
                    keysChain={[key]}
                    onSelected={onElementSelected}
                    selectedId={selectedId}
                    isEditing={isEditing}
                    onFinishEditing={onFinishEditing}
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
    isEditing,
    onFinishEditing,
    isParentDisabled,
}: {
    data: TreeNode;
    keysChain: string[];
    nestingLevel: number;
    onSelected: (idsChain: string[]) => void;
    onFinishEditing?: (value: string) => void;
    selectedId?: string;
    isEditing?: boolean;
    isParentDisabled: boolean;
}): ReactElement => {
    const isDisabled = isParentDisabled || !!data.disabled;

    return (
        <>
            <TreeElement
                label={data.value!} // ! because only root node can have null value and it never renders
                nestingLevel={nestingLevel}
                onClick={() => !data.disabled && onSelected(keysChain)}
                onFinishEditing={onFinishEditing}
                isSelected={keysChain[keysChain.length - 1] === selectedId}
                isEditing={isEditing}
                isDisabled={isDisabled}
            />
            {Object.entries(data.nodes).map(([key, value]) => (
                <TreeViewElement
                    key={key}
                    data={value}
                    nestingLevel={nestingLevel + 1}
                    keysChain={[...keysChain, key]}
                    onSelected={onSelected}
                    selectedId={selectedId}
                    isEditing={isEditing}
                    onFinishEditing={onFinishEditing}
                    isParentDisabled={isDisabled}
                />
            ))}
        </>
    );
};
