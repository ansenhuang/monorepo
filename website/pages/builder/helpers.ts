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
    const targetMaterial = materials.find(
      (material) => material.name === node.name || material.name === node.builderName,
    );
    const Component = targetMaterial?.Component || null;
    const getNodeSchema = (Component as any)?.__getInitialNodeSchema;
    let currentNode = node;

    if (typeof getNodeSchema === 'function') {
      currentNode = {
        ...node,
        ...getNodeSchema(node),
      };
    }

    let currentChildren = currentNode.children;

    return {
      ...currentNode,
      Component,
      children: Array.isArray(currentChildren)
        ? currentChildren.map((child) => loop(child))
        : currentChildren && loop(currentChildren),
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
      const getNodeSchema = (node.Component as any)?.__getFinalNodeSchema;

      if (typeof getNodeSchema === 'function') {
        // 覆盖当前节点数据
        Object.assign(node, getNodeSchema(node));
      }

      // 删除不需要的节点
      const nodeAlias: any = node;
      delete nodeAlias.Component;
      delete nodeAlias.unmounted;

      let currentChildren = node.children;

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
    Component: null,
    children: Array.isArray(children)
      ? children.map((child) => normalizeNodeScheme(child))
      : children && normalizeNodeScheme(children),
  };
};

export const buildNodeSchema = (material: MaterialSchema): NodeSchema => {
  const { name, label, type, Component, propsSchema, children } = material;
  const props = getInitialValues(propsSchema);

  return {
    key: name + '_' + getUuid(),
    name,
    label,
    type,
    Component,
    props,
    unmounted: true,
    children: Array.isArray(children)
      ? children.map((child) => normalizeNodeScheme(child))
      : children && normalizeNodeScheme(children),
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
