import type {
  PageSchema,
  StorePageSchema,
  CoreNodeSchema,
  NodeSchema,
  MaterialSchema,
} from './types';

const PAGE_SCHEMA = '@__PAGE_SCHEMA__@';

const normalizePageSchema = (schema: StorePageSchema, materials: MaterialSchema[]): PageSchema => {
  const recursion = (children: StorePageSchema['children']): PageSchema['children'] => {
    return children.map((child) => ({
      ...child,
      Component: materials.find((material) => material.name === child.name)?.Component || null,
      children: child.children ? recursion(child.children) : undefined,
    }));
  };

  return {
    ...schema,
    children: recursion(schema.children),
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

export const getStringifyPageSchema = (schema: PageSchema, space?: number) => {
  return JSON.stringify(
    schema,
    (k, v) => {
      if (k === 'Component') {
        return undefined;
      }
      return v;
    },
    space,
  );
};

export const setPageSchema = (schema: PageSchema) => {
  window.localStorage.setItem(PAGE_SCHEMA, getStringifyPageSchema(schema));
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
    children: children && children.map((child) => normalizeNodeScheme(child)),
  };
};

export const buildNodeSchema = (material: MaterialSchema): NodeSchema => {
  const { name, label, type, Component, propsSchema, children } = material;
  const props = getInitialValues(propsSchema);
  let currentChildren = children;

  if (type === 'builder') {
    const getChildren = (Component as any).__getInitialNodeSchema;
    if (typeof getChildren === 'function') {
      currentChildren = getChildren(material, props);
    }
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
