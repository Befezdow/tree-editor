import React, {ReactElement, useState} from 'react';
import {useStore} from 'effector-react';

import {TreeView} from 'components/TreeView';
import {cacheData$, editorReset} from 'models/cache';
import {Root, Toolbar} from './styled';

export interface CacheViewProps {
    className?: string;
}

export const CacheView = ({className}: CacheViewProps): ReactElement => {
    const {innerData: {nodes: cacheNodes}} = useStore(cacheData$);

    const [selectedIdsChain, setSelectedIdsChain] = useState<string[]>([]);
    const isNodeSelected = selectedIdsChain.length > 0;
    const selectedId = isNodeSelected ? selectedIdsChain[selectedIdsChain.length - 1] : undefined;

    return (
        <Root className={className}>
            <TreeView
                data={cacheNodes}
                onElementSelected={(idsChain) => setSelectedIdsChain(idsChain)}
                selectedId={selectedId}
            />

            <Toolbar>
                <button
                    onClick={() => console.log('add', selectedIdsChain)}
                    disabled={!isNodeSelected}
                >
                    +
                </button>
                <button
                    onClick={() => console.log('delete', selectedIdsChain)}
                    disabled={!isNodeSelected}
                >
                    -
                </button>
                <button
                    onClick={() => console.log('edit', selectedIdsChain)}
                    disabled={!isNodeSelected}
                >
                    a
                </button>
                <button onClick={() => console.log('apply')} disabled={Object.keys(cacheNodes).length === 0}>
                    Apply
                </button>
                <button onClick={() => editorReset()}>
                    Reset
                </button>
            </Toolbar>
        </Root>
    );
};
