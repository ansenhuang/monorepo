import dragSource from './dragsource';
import type { DropDataItem } from './types';

const saveKey = '@@__SCHEMA__@@';

export const getDropData = (): DropDataItem[] => {
  const value = window.localStorage.getItem(saveKey);
  if (value) {
    try {
      return JSON.parse(value);
    } catch (error) {}
  }
  return [];
};

export const setDropData = (data: DropDataItem[]) => {
  const value = JSON.stringify(data);
  window.localStorage.setItem(saveKey, value);
};

export const normalizedDropData = (dropData: DropDataItem[]): DropDataItem[] =>
  dropData.map((dropItem) => ({
    ...dropItem,
    Component: dragSource.find((dragItem) => dragItem.name === dropItem.name)?.Component || null,
    children: dropItem.children ? normalizedDropData(dropItem.children) : undefined,
  }));
