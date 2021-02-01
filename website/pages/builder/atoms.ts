import { setAtomState } from '@axe/context';
import dragSource from './dragsource';
import { getPageData, normalizedPageData } from './helpers';
import type { DropDataItem } from './types';

export const dragSourceAtomState = setAtomState(dragSource);
export const pageDataAtomState = setAtomState(normalizedPageData(getPageData()));
export const selectedDropItemAtomState = setAtomState<DropDataItem | null>(null);
