import React, {ReactElement} from 'react';

import {DatabaseView} from './DatabaseView';
import {CacheView} from './CacheView';
import {Root} from './styled';

export const TreeEditor = (): ReactElement => {
    return (
        <>
            <Root>
                <CacheView />
                <DatabaseView />
            </Root>
        </>
    );
};
