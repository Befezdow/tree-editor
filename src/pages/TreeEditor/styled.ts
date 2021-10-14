import styled from 'styled-components';

import { DatabaseView } from './DatabaseView';

export const Root = styled.div`
    height: calc(100vh - 40px);
    padding: 20px;

    display: flex;
    justify-content: stretch;
    align-items: stretch;
    gap: 20px;

    background-color: lightgray;
  
    > div {
      width: calc(50% - 10px);
      flex: 1;
    }
`;

export const CustomDatabaseView = styled(DatabaseView)`
    flex: 1;
`;
