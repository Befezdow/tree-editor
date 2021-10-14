import styled from 'styled-components';

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
    gap: 10px;
    flex-wrap: wrap;
`;
