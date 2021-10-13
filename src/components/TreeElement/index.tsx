import React, {MouseEvent, ReactElement, useState} from 'react';
import {Label, LabelEditor, Root} from './styled';

export interface TreeElementProps {
    label: string;
    nestingLevel: number;
    onClick?: () => void;
    onFinishEditing?: (value: string) => void;
    isSelected?: boolean;
    isEditing?: boolean;
    isDisabled?: boolean;
    className?: string;
}

export const TreeElement = ({
    label,
    nestingLevel,
    onClick,
    onFinishEditing,
    isSelected,
    isEditing,
    isDisabled,
    className,
}: TreeElementProps): ReactElement => {
    const [editValue, setEditValue] = useState<string>(label);

    const handleClick = (event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        onClick && onClick();
    };

    return (
        <Root
            offsetsCount={nestingLevel}
            onClick={(event) => handleClick(event)}
            isSelected={isSelected}
            className={className}
            isDisabled={isDisabled}
        >
            {isSelected && isEditing ? (
                <LabelEditor
                    value={editValue}
                    onChange={(event) => setEditValue(event.target.value)}
                    onBlur={() => onFinishEditing && onFinishEditing(editValue)}
                    onKeyDown={(event) =>
                        event.key === 'Enter' && onFinishEditing && onFinishEditing(editValue)
                    }
                    autoFocus
                />
            ) : (
                <Label>{label}</Label>
            )}
        </Root>
    );
};
