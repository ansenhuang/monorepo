import React, { useEffect, useState } from 'react';
import { bootstrap, mount, unmount } from '@axe/renderer';
import styled from 'styled-components';
import { Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import SchemaEditor from './SchemaEditor';
import materials from './materials';

import type { PageSchema } from '@axe/renderer';

const Wrapper = styled.div`
  position: relative;
  height: 100%;
  overflow: auto;
`;
const EditButton = styled(Button)`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 100;
`;

const pageSchemaKey = '@__RENDERER_SCHEMA__@';
const pageSchemaStore = {
  get: (): PageSchema => {
    const json = window.localStorage.getItem(pageSchemaKey);
    if (json) {
      try {
        return JSON.parse(json);
      } catch (error) {}
    }
    return {
      root: true,
      nodes: [],
    };
  },
  set: (value: PageSchema) => {
    window.localStorage.setItem(pageSchemaKey, JSON.stringify(value));
  },
};

const initialPageSchema = pageSchemaStore.get();

// 渲染引擎初始化
bootstrap({
  materials,
});

const Page = () => {
  const [pageSchema, setPageSchema] = useState(initialPageSchema);
  const [editVisible, setEditVisible] = useState(false);

  const handleEditOk = (nextPageSchema: PageSchema) => {
    pageSchemaStore.set(nextPageSchema);
    setPageSchema(nextPageSchema);
    setEditVisible(false);
  };

  useEffect(() => {
    mount('#renderer', pageSchema);
    return () => {
      unmount('#renderer');
    };
  }, [pageSchema]);

  return (
    <Wrapper>
      <EditButton
        type="primary"
        shape="circle"
        icon={<EditOutlined />}
        onClick={() => setEditVisible(true)}
      />
      <SchemaEditor
        visible={editVisible}
        schema={pageSchema}
        onCancel={() => setEditVisible(false)}
        onOk={handleEditOk}
      />
      {/* 渲染引擎挂载节点 */}
      <div id="renderer"></div>
    </Wrapper>
  );
};

export default Page;