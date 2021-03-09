import React, { useState } from 'react';
import NotFound from './NotFound';

import type { PageSchema, NodeSchema, MaterialSchema } from '../types';

export interface RenderEngineProps {
  schema: PageSchema;
  materials: MaterialSchema[];
  processor?: (
    element: React.ReactElement | null,
    node: NodeSchema,
    options: RenderNodeOptions,
  ) => React.ReactElement | null;
}

export interface RenderNodeOptions {
  materials: RenderEngineProps['materials'];
  processor?: RenderEngineProps['processor'];
  updater: () => void;
}

const renderNode = (node: NodeSchema, options: RenderNodeOptions) => {
  const { materials, processor } = options;
  const element = (() => {
    const targetMaterial = materials.find((material) => material.name === node.name);

    if (targetMaterial == null) {
      // 未找到对应的组件
      return <NotFound key={node.key} node={node} />;
    }

    if (targetMaterial.Component == null) {
      // 组件为空
      // todo: 远程加载失败处理
      return null;
    }

    const { props, slots } = node;
    const { Component } = targetMaterial;
    const nodeProps: Record<string, any> = { ...props };

    if (slots) {
      Object.entries(slots).forEach(([slotKey, subNodes]) => {
        let children: React.ReactNode;
        if (Array.isArray(subNodes)) {
          children = subNodes.map((subNode) => renderNode(subNode, options));
        } else {
          children = renderNode(subNodes, options);
        }
        nodeProps[slotKey] = children;
      });
    }

    // 渲染组件
    // todo: 组件渲染报错处理
    return <Component key={node.key} {...nodeProps} />;
  })();
  return processor ? processor(element, node, options) : element;
};

const RenderEngine: React.FC<RenderEngineProps> = ({ schema, materials, processor }) => {
  const [, setState] = useState({});

  const { nodes } = schema;
  const updater = () => setState({});
  const children = nodes.map((node) => renderNode(node, { materials, processor, updater }));

  return <>{children}</>;
};

export default RenderEngine;
