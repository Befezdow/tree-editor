import styled, {css} from 'styled-components';

import {colors} from 'theme';

const offsetWidth = 10; // pixels

export const Root = styled.div<{offsetsCount: number; isSelected?: boolean; isDisabled?: boolean}>`
    padding: 5px 10px 5px ${({offsetsCount}) => `${offsetsCount * offsetWidth}px`};
    cursor: pointer;
    white-space: nowrap;
    user-select: none;

    background-color: ${({isSelected}) =>
        isSelected ? colors.backgroundActive : colors.backgroundMain};

    &:hover {
        background-color: ${({isSelected}) =>
            isSelected ? colors.backgroundActive : colors.backgroundHovered};
    }

    ${({isDisabled}) => isDisabled && css`
        cursor: not-allowed;
        color: ${colors.danger};
        background-color: ${colors.backgroundMain};

        &:hover {
            background-color: ${colors.backgroundMain};
        }
    `}
`;
