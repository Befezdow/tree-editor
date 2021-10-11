import styled from 'styled-components';

import {colors} from 'theme';

const offsetWidth = 10; // pixels

export const Root = styled.div<{offsetsCount: number; isActive?: boolean}>`
    padding: 5px 10px 5px ${({offsetsCount}) => `${offsetsCount * offsetWidth}px`};
    cursor: pointer;
    white-space: nowrap;
    user-select: none;

    background-color: ${({isActive}) =>
        isActive ? colors.backgroundActive : colors.backgroundMain};

    &:hover {
        background-color: ${({isActive}) =>
            isActive ? colors.backgroundActive : colors.backgroundHovered};
    }
`;
