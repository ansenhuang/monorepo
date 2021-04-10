import React from 'react';
import type { AxeFormItemConfig } from '@axe/form';

export interface MaterialSchema {
  name: string;
  label: string;
  type?: 'component' | 'builder';
  Component: React.ComponentType<any> | null;
  propsSchema: Record<string, Omit<AxeFormItemConfig, 'name'>>;
  children?: CoreNodeSchema | CoreNodeSchema[];
}

export interface NodeSchema {
  key: string;
  name: MaterialSchema['name'];
  builderName?: MaterialSchema['name'];
  label: MaterialSchema['label'];
  type?: MaterialSchema['type'];
  Component: MaterialSchema['Component'];
  props: Record<string, any>;
  children?: NodeSchema | NodeSchema[];
  visible: boolean;
  unmounted?: boolean;
}

export interface StoreNodeSchema extends Omit<NodeSchema, 'Component' | 'children'> {
  children?: StoreNodeSchema | StoreNodeSchema[];
}

export interface CoreNodeSchema
  extends Omit<NodeSchema, 'key' | 'type' | 'visible' | 'Component' | 'children'> {
  children?: CoreNodeSchema | CoreNodeSchema[];
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
  updatePageSchema: (handler: (draftPageSchema: PageSchema) => void) => void;
  renderSortable: (schema: NodeSchema, currentPaths: string[]) => JSX.Element | null;
}

export interface BuilderComponent extends React.FC<BuilderComponentProps> {
  __getInitialNodeSchema?: (node: NodeSchema) => NodeSchema;
  __getFinalNodeSchema?: (node: NodeSchema) => NodeSchema;
}
