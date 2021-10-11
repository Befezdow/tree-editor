import React, {ReactElement} from 'react';
import {Root} from './styled';

export interface TreeElementProps {
    nestingLevel: number;
    onClick?: () => void;
    isSelected?: boolean;
    children: React.ReactNode;
    className?: string;
}

export const TreeElement = ({
    nestingLevel,
    onClick,
    isSelected,
    children,
    className,
}: TreeElementProps): ReactElement => (
    <Root offsetsCount={nestingLevel} onClick={onClick} isActive={isSelected} className={className}>
        {children}
    </Root>
);
