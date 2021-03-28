import produce from 'immer';
import type {
  PageSchema,
  StorePageSchema,
  CoreNodeSchema,
  NodeSchema,
  MaterialSchema,
  StoreNodeSchema,
} from './types';

const PAGE_SCHEMA = '@__PAGE_SCHEMA__@';

const normalizePageSchema = (schema: StorePageSchema, materials: MaterialSchema[]): PageSchema => {
  const loop = (node: StoreNodeSchema): NodeSchema => {
    return {
      ...node,
      Component: materials.find((material) => material.name === node.name)?.Component || null,
      children: Array.isArray(node.children)
        ? node.children.map((child) => loop(child))
        : node.children && loop(node.children),
    };
  };

  return {
    ...schema,
    children: schema.children.map((child) => loop(child)),
  };
};

export const getPageSchema = (materials: MaterialSchema[]): PageSchema => {
  const value = window.localStorage.getItem(PAGE_SCHEMA);
  if (value) {
    try {
      return normalizePageSchema(JSON.parse(value), materials);
    } catch (error) {}
  }
  return {
    key: 'Page_' + getUuid(),
    name: 'Page',
    label: '页面',
    type: 'root',
    children: [],
  };
};

export const getStorePageSchema = (schema: PageSchema): StorePageSchema => {
  return produce(schema, (draftSchema) => {
    const loop = (node: NodeSchema) => {
      const { Component, children } = node;
      let currentChildren = children;

      // 删除不需要的节点
      (node as any).Component = undefined;

      const setChildren = (Component as any)?.__setFinalNodeSchema;
      if (typeof setChildren === 'function') {
        currentChildren = setChildren(node);
      }

      // 递归
      if (Array.isArray(currentChildren)) {
        currentChildren.map((child) => loop(child));
      } else if (currentChildren) {
        loop(currentChildren);
      }
    };
    draftSchema.children.map((child) => loop(child));
  }) as StorePageSchema;
};

export const setPageSchema = (schema: PageSchema) => {
  window.localStorage.setItem(PAGE_SCHEMA, JSON.stringify(getStorePageSchema(schema)));
};

export const getInitialValues = (schema: MaterialSchema['propsSchema']) => {
  const props: Record<string, any> = {};
  Object.entries(schema).forEach(([name, value]) => {
    props[name] = value.initialValue;
  });
  return props;
};

export const normalizeNodeScheme = (schema: CoreNodeSchema): NodeSchema => {
  const { name, children } = schema;

  return {
    ...schema,
    key: name + '_' + getUuid(),
    type: 'component',
    Component: null,
    children: Array.isArray(children)
      ? children.map((child) => normalizeNodeScheme(child))
      : children && normalizeNodeScheme(children),
  };
};

export const buildNodeSchema = (material: MaterialSchema): NodeSchema => {
  const { name, label, type, Component, propsSchema, children } = material;
  const props = getInitialValues(propsSchema);
  let currentChildren = children;

  const getChildren = (Component as any)?.__getInitialNodeSchema;
  if (typeof getChildren === 'function') {
    currentChildren = getChildren(material, props);
  }

  return {
    key: name + '_' + getUuid(),
    name,
    label,
    type,
    Component,
    props,
    children: Array.isArray(currentChildren)
      ? currentChildren.map((child) => normalizeNodeScheme(child))
      : currentChildren && normalizeNodeScheme(currentChildren),
  };
};

export const getTargetFromTree = (data: any, paths: string[]) => {
  const newPaths = [...paths];
  const lastPath = newPaths.pop();
  let current: any = data;
  let key = newPaths.shift();
  while (current && key) {
    current = current[key];
    key = newPaths.shift();
  }
  if (lastPath && newPaths.length === 0) {
    // 找到目标节点
    return { current, key: lastPath };
  }

  // 未找到目标节点
  return null;
};

export const getUuid = () => {
  // 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
  return '4xxx-yxxx'.replace(/[xy]/g, (c) => {
    /* eslint-disable no-mixed-operators */
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
