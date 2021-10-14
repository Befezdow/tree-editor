import {createDomain} from 'effector';
import {createGate} from 'effector-react';

export const rootDomain = createDomain('rootDomain');
rootDomain.onCreateStore((store) => store.reset(EditorGate.close));

export const EditorGate = createGate();

export const changesApplied = rootDomain.createEvent();
export const editorReset = rootDomain.createEvent();
