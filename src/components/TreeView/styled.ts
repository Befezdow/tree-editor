import styled from 'styled-components';

export const Root = styled.div`
    overflow: auto;
    background-color: white;
    border: 1px solid gray;
`;

export const ElementsContainer = styled.div`
    display: inline-block;
    margin: 20px;
    min-width: calc((100vw - 144px) / 2);
`;
