import {combine, restore} from 'effector';

import {CacheTreeNode} from 'types';
import {rootDomain} from '../';

const domain = rootDomain.createDomain('cacheDomain');

// events

export const cacheSelected = domain.createEvent<string[]>();
export const elementDeleted = domain.createEvent();
export const elementEditStarted = domain.createEvent();
export const elementEditEnded = domain.createEvent<string>();
export const elementAdded = domain.createEvent();
export const cacheSelectedReset = domain.createEvent();
export const cacheEditingReset = domain.createEvent();
export const newElementCreated =
    domain.createEvent<{parentIdsChain: string[]; newNodeId: string; newNode: CacheTreeNode}>();

// stores

export const cacheData$ = domain.createStore<{innerData: CacheTreeNode}>({
    innerData: {value: null, nodes: {}},
});
export const cacheSelectedIdsChain$ = restore(cacheSelected, []);
export const cacheSelectedId$ = cacheSelectedIdsChain$.map<string | null>((state) =>
    state.length > 0 ? state[state.length - 1] : null,
);
export const cacheEditing$ = domain.createStore<boolean>(false);

// component states

export const cacheState$ = combine({
    data: cacheData$,
    selectedId: cacheSelectedId$,
    cacheEditing: cacheEditing$,
});
