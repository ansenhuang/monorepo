import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useAtomState } from '@axe/context';
import { Empty } from 'antd';
import { pageSchemaState } from '../atoms';
import { getStorePageSchema } from '../helpers';
import * as basicMaterials from '../materials/basic';
import type { StoreNodeSchema } from '../types';

const Page = styled.div`
  position: relative;
`;

interface RendererProps {}

const Renderer: React.FC<RendererProps> = () => {
  const [pageSchema] = useAtomState(pageSchemaState);

  const storePageSchema = useMemo(() => getStorePageSchema(pageSchema), [pageSchema]);

  const renderNode = (node: StoreNodeSchema) => {
    const { key, name, visible, props, children } = node;
    const Component = (basicMaterials as any)[name];

    return Component ? (
      visible ? (
        <Component
          key={key}
          children={
            Array.isArray(children)
              ? children.map((child) => renderNode(child))
              : children && renderNode(children)
          }
          {...props}
        />
      ) : null
    ) : (
      <Empty
        key={key}
        style={{ margin: 0, padding: 10 }}
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={`[${name}]组件不存在`}
      />
    );
  };

  return <Page>{storePageSchema.children.map((child) => renderNode(child))}</Page>;
};

export default Renderer;
