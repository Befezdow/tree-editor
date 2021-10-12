import React, {ReactElement} from 'react';
import {Root} from './styled';

export interface TreeElementProps {
    nestingLevel: number;
    onClick?: () => void;
    isSelected?: boolean;
    isDisabled?: boolean;
    children: React.ReactNode;
    className?: string;
}

export const TreeElement = ({
    nestingLevel,
    onClick,
    isSelected,
    isDisabled,
    children,
    className,
}: TreeElementProps): ReactElement => (
    <Root
        offsetsCount={nestingLevel}
        onClick={onClick}
        isSelected={isSelected}
        className={className}
        isDisabled={isDisabled}
    >
        {children}
    </Root>
);
