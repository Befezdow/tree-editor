import React, {ReactElement} from 'react';
import {useStore} from 'effector-react';

import {TreeView} from 'components/TreeView';
import {applyChanges, cacheSelected, cacheState$, editorReset, elementDeleted} from 'models/editor';
import {Root, Toolbar} from './styled';

export interface CacheViewProps {
    className?: string;
}

export const CacheView = ({className}: CacheViewProps): ReactElement => {
    const {data, selectedId} = useStore(cacheState$);

    return (
        <Root className={className}>
            <TreeView
                data={data.innerData.nodes}
                onElementSelected={cacheSelected}
                selectedId={selectedId ?? undefined}
            />

            <Toolbar>
                <button onClick={() => console.log('add')} disabled={selectedId === null}>
                    +
                </button>
                <button onClick={() => elementDeleted()} disabled={selectedId === null}>
                    -
                </button>
                <button onClick={() => console.log('edit')} disabled={selectedId === null}>
                    a
                </button>
                <button
                    onClick={() => applyChanges()}
                    disabled={Object.keys(data.innerData.nodes).length === 0}
                >
                    Apply
                </button>
                <button onClick={() => editorReset()}>Reset</button>
            </Toolbar>
        </Root>
    );
};
