import { setAtomState } from '@axe/context';
import dragSource from './dragsource';
import { getDropData, normalizedDropData } from './helpers';

export const dragSourceAtomState = setAtomState(dragSource);
export const dropDataAtomState = setAtomState(normalizedDropData(getDropData()));
