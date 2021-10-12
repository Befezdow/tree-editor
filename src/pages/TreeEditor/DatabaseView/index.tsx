import React, {ReactElement} from 'react';
import {useStore} from 'effector-react';

import {TreeView} from 'components/TreeView';
import {dbSelected, dbState$, elementPulled} from 'models/editor';
import {Root, Toolbar} from './styled';

export interface DatabaseViewProps {
    className?: string;
}

export const DatabaseView = ({className}: DatabaseViewProps): ReactElement => {
    const {data, selectedId} = useStore(dbState$);

    return (
        <Root className={className}>
            <TreeView
                data={data.innerData.nodes}
                onElementSelected={dbSelected}
                selectedId={selectedId ?? undefined}
            />

            <Toolbar>
                <button onClick={() => elementPulled()} disabled={selectedId === null}>
                    Pull
                </button>
            </Toolbar>
        </Root>
    );
};
