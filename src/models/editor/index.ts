import {combine, createDomain, restore} from 'effector';
import {createGate} from "effector-react";

import {Database} from 'api/database';
import {CacheTreeNode, TreeNode} from 'types';

const domain = createDomain('CacheDomain');

export const EditorGate = createGate();

// effects

export const pullElementFromDbFx = domain.createEffect({
    name: 'createOrder',
    handler: Database.getElement,
});

export const resetDbFx = domain.createEffect({
    name: 'resetDb',
    handler: Database.reset,
});

export const updateDbFx = domain.createEffect({
    name: 'updateDb',
    handler: Database.update,
});

// events

export const dbSelected = domain.createEvent<string[]>();
export const cacheSelected = domain.createEvent<string[]>();
export const cacheSelectedReset = domain.createEvent();

export const elementPulled = domain.createEvent();
export const elementDeleted = domain.createEvent();
export const editorReset = domain.createEvent();
export const applyChanges = domain.createEvent();

// stores

export const dbData$ = domain.createStore<{innerData: TreeNode}>({
    innerData: {value: null, nodes: {}},
});
export const cacheData$ = domain.createStore<{innerData: CacheTreeNode}>({
    innerData: {value: null, nodes: {}},
});
export const dbSelectedIdsChain$ = restore(dbSelected, []);
export const dbSelectedId$ = dbSelectedIdsChain$.map<string | null>((state) =>
    state.length > 0 ? state[state.length - 1] : null,
);
export const cacheSelectedIdsChain$ = restore(cacheSelected, []);
export const cacheSelectedId$ = cacheSelectedIdsChain$.map<string | null>((state) =>
    state.length > 0 ? state[state.length - 1] : null,
);

// component states

export const dbState$ = combine({
    data: dbData$,
    selectedId: dbSelectedId$,
});

export const cacheState$ = combine({
    data: cacheData$,
    selectedId: cacheSelectedId$,
});
