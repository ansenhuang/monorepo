import React, { useMemo } from 'react';
import NotFound from './NotFound';

import type { PageSchema, NodeSchema, MaterialSchema } from '../types';

export interface RenderEngineProps {
  schema: PageSchema;
  materials: MaterialSchema[];
}

const renderNode = (node: NodeSchema, materials: MaterialSchema[]) => {
  const targetMaterial = materials.find((material) => material.name === node.name);

  // 未找到对应的组件
  if (targetMaterial == null) {
    return <NotFound key={node.key} node={node} />;
  }

  const { Component } = targetMaterial;

  // 组件为空
  // todo: 远程加载失败处理
  if (Component == null) {
    return null;
  }

  const { key, props, slots } = node;
  const nodeProps: Record<string, any> = { key, ...props };

  if (slots) {
    Object.entries(slots).forEach(([slotKey, subNodes]) => {
      let children: React.ReactNode;
      if (Array.isArray(subNodes)) {
        children = subNodes.map((subNode) => renderNode(subNode, materials));
      } else {
        children = renderNode(subNodes, materials);
      }
      nodeProps[slotKey] = children;
    });
  }

  // 渲染组件
  // todo: 组件渲染报错处理
  return <Component {...nodeProps} />;
};

const RenderEngine: React.FC<RenderEngineProps> = ({ schema, materials }) => {
  const children = useMemo(() => {
    const { nodes } = schema;

    return (
      <div style={{ backgroundColor: '#eee' }}>
        {nodes.map((node) => renderNode(node, materials))}
      </div>
    );
  }, [schema, materials]);

  return children;
};

export default RenderEngine;
