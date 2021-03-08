import React from 'react';

export interface NodeSchema extends Omit<MaterialSchema, 'Component'> {
  key: string;
  props: Record<string, any>;
  slots: Record<string, NodeSchema | NodeSchema[]>;
}

export interface PageSchema {
  root: true;
  nodes: NodeSchema[];
}

export interface MaterialSchema {
  name: string;
  type?: 'form';
  label: string;
  package?: PackageSchema;
  Component: React.ComponentType<any> | null;
}

export interface PackageSchema {
  name: string;
  version: string;
  url?: string;
}
