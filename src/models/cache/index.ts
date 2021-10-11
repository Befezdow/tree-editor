import {createDomain} from 'effector';

import {Database} from 'api/database';
import {CacheTreeNode} from 'types';

const domain = createDomain('CacheDomain');

export const pullElementFromDbFx = domain.createEffect({
    name: 'createOrder',
    handler: Database.getElement,
});

export const resetDbFx = domain.createEffect({
    name: 'createOrder',
    handler: Database.reset,
});

export const elementPulled = domain.createEvent<string[]>();
export const editorReset = domain.createEvent();

export const cacheData$ = domain.createStore<{innerData: CacheTreeNode}>({
    innerData: {value: null, parentId: null, nodes: {}},
});
