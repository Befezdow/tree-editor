import React, {ReactElement} from 'react';

import {EditorGate} from 'models/editor';
import {DatabaseView} from './DatabaseView';
import {CacheView} from './CacheView';
import {Root} from './styled';

export const TreeEditor = (): ReactElement => {
    return (
        <>
            <Root>
                <EditorGate />
                <CacheView />
                <DatabaseView />
            </Root>
        </>
    );
};
