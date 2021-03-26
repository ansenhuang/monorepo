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
    key: 'Page_' + Date.now(),
    name: 'Page',
    label: '页面',
    children: [],
  };
};

export const setPageSchema = (schema: PageSchema) => {
  const value = JSON.stringify(schema);
  window.localStorage.setItem(PAGE_SCHEMA, value);
};

export const getParentNode = (node: NodeSchema, schema: PageSchema) => {
  const recursion = (
    children: NodeSchema[],
    parentNode: PageSchema | NodeSchema,
  ): PageSchema | NodeSchema | null => {
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (child.key === node.key) {
        return parentNode;
      }
      if (child.children) {
        return recursion(child.children, child);
      }
    }
    return null;
  };

  return recursion(schema.children, schema);
};

export const isPageSchema = (schema: any): schema is PageSchema => {
  if (schema && typeof schema.props === 'undefined' && typeof schema.Component === 'undefined') {
    return true;
  }
  return false;
};

export const buildNodeSchema = (material: MaterialSchema): NodeSchema => {
  const { name, label, Component, defaultProps, isContainer } = material;
  return {
    key: name + '_' + Date.now(),
    name,
    label,
    Component,
    props: { ...defaultProps },
    children: isContainer ? [] : undefined,
  };
};
