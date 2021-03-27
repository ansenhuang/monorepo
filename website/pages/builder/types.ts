import React from 'react';

export interface MaterialSchema {
  name: string;
  label: string;
  type: 'component' | 'builder';
  Component: React.ComponentType<any> | null;
  props: Record<string, any>;
  children?: MaterialSchema[];
}

export interface NodeSchema {
  key: string;
  name: MaterialSchema['name'];
  label: MaterialSchema['label'];
  type: MaterialSchema['type'];
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
  type: 'root';
  children: NodeSchema[];
}

export interface StorePageSchema extends Omit<PageSchema, 'children'> {
  children: StoreNodeSchema[];
}

export interface BuilderComponentProps {
  schema: NodeSchema;
  paths: string[];
  updatePageSchema: (draftPageSchema: PageSchema) => void;
  renderSortable: (schema: NodeSchema, currentPaths: string[]) => JSX.Element | null;
}
