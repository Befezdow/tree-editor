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
            {Object.entries(data)
                .filter(([, value]) => !value.disabled)
                .map(([key, value]) => (
                    <TreeViewElement
                        key={key}
                        data={value}
                        nestingLevel={0}
                        keysChain={[key]}
                        onSelected={onElementSelected}
                        selectedId={selectedId}
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
}: {
    data: TreeNode;
    keysChain: string[];
    nestingLevel: number;
    onSelected: (idsChain: string[]) => void;
    selectedId?: string;
}): ReactElement => (
    <>
        <TreeElement
            nestingLevel={nestingLevel}
            onClick={() => onSelected(keysChain)}
            isSelected={keysChain[keysChain.length - 1] === selectedId}
        >
            {data.value}
        </TreeElement>
        {Object.entries(data.nodes)
            .filter(([, value]) => !value.disabled)
            .map(([key, value]) => (
                <TreeViewElement
                    key={key}
                    data={value}
                    nestingLevel={nestingLevel + 1}
                    keysChain={[...keysChain, key]}
                    onSelected={onSelected}
                    selectedId={selectedId}
                />
            ))}
    </>
);
