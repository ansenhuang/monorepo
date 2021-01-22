import { setAtomState } from '@axe/context';
import dragSource from './dragsource';
import type { DragSourceItem } from './dragsource';

export interface DropDataItem extends DragSourceItem {
  id: string;
}

export const dragSourceAtomState = setAtomState(dragSource);
export const dropDataAtomState = setAtomState<DropDataItem[]>([]);
export const cloneElementAtomState = setAtomState<HTMLElement | null>(null);
