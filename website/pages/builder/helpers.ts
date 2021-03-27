import { isValidElementType } from 'react-is';
import type { PageSchema, StorePageSchema, NodeSchema, MaterialSchema } from './types';

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
      if (k === 'Component' && isValidElementType(v)) {
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

export const buildNodeSchema = (material: MaterialSchema): NodeSchema => {
  const { name, label, type, Component, propsSchema, children } = material;
  return {
    key: name + '_' + getUuid(),
    name,
    label,
    type,
    Component,
    props: getInitialValues(propsSchema),
    children: children && children.map((child) => buildNodeSchema(child)),
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
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    /* eslint-disable no-mixed-operators */
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
