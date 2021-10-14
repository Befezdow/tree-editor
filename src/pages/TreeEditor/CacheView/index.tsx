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
import {Button, LeftPanel, RightPanel, Root, SmallButton, Toolbar} from './styled';

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
                <LeftPanel>
                    <SmallButton onClick={() => elementAdded()}>+</SmallButton>
                    <SmallButton onClick={() => elementDeleted()} disabled={selectedId === null}>
                        -
                    </SmallButton>
                    <Button onClick={() => elementEditStarted()} disabled={selectedId === null}>
                        Edit
                    </Button>
                </LeftPanel>
                <RightPanel>
                    <Button
                        onClick={() => changesApplied()}
                        disabled={Object.keys(data.innerData.nodes).length === 0}
                    >
                        Apply
                    </Button>
                    <Button onClick={() => editorReset()}>Reset</Button>
                </RightPanel>
            </Toolbar>
        </Root>
    );
};
