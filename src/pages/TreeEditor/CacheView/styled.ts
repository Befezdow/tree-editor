import styled from 'styled-components';

import {buttonReset} from 'theme';

export const Root = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    align-items: stretch;
    gap: 10px;

    > div {
        &:first-child {
            flex: 1;
        }
    }
`;

export const Toolbar = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    flex-wrap: wrap;
`;

export const LeftPanel = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
`;

export const RightPanel = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
`;

export const Button = styled.button`
    ${buttonReset};
`;

export const SmallButton = styled(Button)`
    padding-left: 10px;
    padding-right: 10px;
`;
