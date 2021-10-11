import React, {ReactElement, useState} from 'react';

import {Database} from 'api/database';
import {TreeView} from 'components/TreeView';
import {elementPulled} from 'models/cache';
import {Root, Toolbar} from './styled';

export interface DatabaseViewProps {
    className?: string;
}

export const DatabaseView = ({className}: DatabaseViewProps): ReactElement => {
    const [selectedIdsChain, setSelectedIdsChain] = useState<string[]>([]);
    const isNodeSelected = selectedIdsChain.length > 0;
    const selectedId = isNodeSelected ? selectedIdsChain[selectedIdsChain.length - 1] : undefined;

    return (
        <Root className={className}>
            <TreeView
                data={Database.getFullData()}
                onElementSelected={(idsChain) => setSelectedIdsChain(idsChain)}
                selectedId={selectedId}
            />

            <Toolbar>
                <button onClick={() => elementPulled(selectedIdsChain)} disabled={!isNodeSelected}>
                    Pull
                </button>
            </Toolbar>
        </Root>
    );
};
