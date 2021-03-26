import React from 'react';

export interface MaterialSchema {
  name: string;
  label: string;
  Component: React.ComponentType<any> | null;
  defaultProps: Record<string, any>;
  isContainer?: boolean;
}

export interface NodeSchema {
  key: string;
  name: MaterialSchema['name'];
  label: MaterialSchema['label'];
  Component: MaterialSchema['Component'];
  props: Record<string, any>;
  children?: NodeSchema[];
}

export interface StoreNodeSchema extends Omit<NodeSchema, 'Component' | 'children'> {
  children?: StoreNodeSchema[];
}

export interface PageSchema {
  key: string;
  name: MaterialSchema['name'];
  label: MaterialSchema['label'];
  children: NodeSchema[];
}

export interface StorePageSchema extends Omit<PageSchema, 'children'> {
  children: StoreNodeSchema[];
}
