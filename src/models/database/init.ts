import {forward, sample} from 'effector';

import {Database} from 'api/database';
import {ChainError} from 'types';
import {changesApplied, EditorGate, editorReset} from '../';
import {cacheData$} from '../cache';
import {
    dbData$,
    dbSelectedIdsChain$,
    elementPulled,
    pullElementFromDbFx,
    resetDbFx,
    updateDbFx,
} from './index';

dbData$.on([EditorGate.open, updateDbFx.done, resetDbFx.done], () => ({
    innerData: Database.getData(),
}));
dbSelectedIdsChain$.reset(pullElementFromDbFx.done, editorReset);

forward({from: editorReset, to: resetDbFx});

sample({
    clock: elementPulled,
    source: dbSelectedIdsChain$,
    target: pullElementFromDbFx,
});

sample({
    clock: changesApplied,
    source: cacheData$.map((state) => state.innerData),
    target: updateDbFx,
});

pullElementFromDbFx.failData.watch((error) => {
    const chainError = error as ChainError;
    console.error(chainError.message, chainError.chain);
});
