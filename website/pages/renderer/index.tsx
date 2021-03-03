import React, { useEffect, useState } from 'react';
import renderer from '@axe/renderer';
import styled from 'styled-components';
import { Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import SchemaEditor from './SchemaEditor';

import type { PageSchema } from './types';

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

const Page = () => {
  const [pageSchema, setPageSchema] = useState(initialPageSchema);
  const [editVisible, setEditVisible] = useState(false);

  const handleEditOk = (nextPageSchema: PageSchema) => {
    pageSchemaStore.set(nextPageSchema);
    setPageSchema(nextPageSchema);
    setEditVisible(false);
  };

  useEffect(() => {
    renderer.mounted('#renderer', pageSchema);
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
      <div id="renderer"></div>
    </Wrapper>
  );
};

export default Page;
