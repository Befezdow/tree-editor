import {combine, restore} from 'effector';

import {Database} from 'api/database';
import {TreeNode} from 'types';
import {rootDomain} from '../';

const domain = rootDomain.createDomain('databaseDomain');

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
export const elementPulled = domain.createEvent();

// stores

export const dbData$ = domain.createStore<{innerData: TreeNode}>({
    innerData: {value: null, nodes: {}},
});
export const dbSelectedIdsChain$ = restore(dbSelected, []);
export const dbSelectedId$ = dbSelectedIdsChain$.map<string | null>((state) =>
    state.length > 0 ? state[state.length - 1] : null,
);

// component states

export const dbState$ = combine({
    data: dbData$,
    selectedId: dbSelectedId$,
});
