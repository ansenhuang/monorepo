import dragSource from './dragsource';
import type { DropDataItem, PageData } from './types';

const SCHEMA_KEY = '@@__SCHEMA__@@';

export const getPageData = (): PageData => {
  const value = window.localStorage.getItem(SCHEMA_KEY);
  if (value) {
    try {
      return JSON.parse(value);
    } catch (error) {}
  }
  return {
    root: true,
    children: [],
  };
};

export const setPageData = (data: PageData) => {
  const value = JSON.stringify(data);
  window.localStorage.setItem(SCHEMA_KEY, value);
};

export const isPageData = (data: any): data is PageData => {
  if (data && typeof data === 'object' && data.root && Array.isArray(data.children)) {
    return true;
  }
  return false;
};

export const normalizedPageData = (pageData: PageData): PageData => {
  const getChildren = (children: DropDataItem[]): DropDataItem[] => {
    return children.map((child) => ({
      ...child,
      Component: dragSource.find((dragItem) => dragItem.name === child.name)?.Component || null,
      children: child.children ? getChildren(child.children) : undefined,
    }));
  };
  return {
    ...pageData,
    children: getChildren(pageData.children),
  };
};

export const getParentFromPageData = (item: DropDataItem, pageData: PageData) => {
  const getParent = (
    children: DropDataItem[],
    parent: PageData | DropDataItem,
  ): PageData | DropDataItem | null => {
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (child.key === item.key) {
        return parent;
      }
      if (child.children) {
        return getParent(child.children, child);
      }
    }
    return null;
  };

  return getParent(pageData.children, pageData);
};
