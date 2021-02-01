import React from 'react';

export interface DragSourceItem {
  key: string;
  name: string;
  label: string;
  Component: React.ComponentType<any> | null;
  props: any;
  children?: DragSourceItem[];
}

export interface DropDataItem extends DragSourceItem {
  children?: DropDataItem[];
}

export interface PageData {
  root: true;
  children: DropDataItem[];
}
