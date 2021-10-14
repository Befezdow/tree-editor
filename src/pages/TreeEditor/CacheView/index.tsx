import React, {ReactElement} from 'react';
import {useStore} from 'effector-react';

import {TreeView} from 'components/TreeView';
import {changesApplied, editorReset} from 'models';
import {
    cacheSelected,
    cacheState$,
    elementAdded,
    elementDeleted,
    elementEditEnded,
    elementEditStarted,
} from 'models/cache';
import {Root, Toolbar} from './styled';

export interface CacheViewProps {
    className?: string;
}

export const CacheView = ({className}: CacheViewProps): ReactElement => {
    const {data, selectedId, cacheEditing} = useStore(cacheState$);

    return (
        <Root className={className}>
            <TreeView
                data={data.innerData.nodes}
                onElementSelected={cacheSelected}
                selectedId={selectedId ?? undefined}
                isEditing={cacheEditing}
                onFinishEditing={elementEditEnded}
            />

            <Toolbar>
                <button onClick={() => elementAdded()}>+</button>
                <button onClick={() => elementDeleted()} disabled={selectedId === null}>
                    -
                </button>
                <button onClick={() => elementEditStarted()} disabled={selectedId === null}>
                    a
                </button>
                <button
                    onClick={() => changesApplied()}
                    disabled={Object.keys(data.innerData.nodes).length === 0}
                >
                    Apply
                </button>
                <button onClick={() => editorReset()}>Reset</button>
            </Toolbar>
        </Root>
    );
};
