import React from 'react';
import styled from 'styled-components';
import { Layout } from 'antd';
import HeaderArea from './components/HeaderArea';
import MaterialArea from './components/MaterialArea';
import SortableArea from './components/SortableArea';
import AttributeArea from './components/AttributeArea';

const LayoutHeader = styled(Layout.Header)`
  padding: 0;
  height: 50px;
  background-color: #fff;
  border-bottom: 1px solid rgba(31, 56, 88, 0.1);
`;

const Builder: React.FC = () => {
  return (
    <Layout style={{ height: '100vh', overflow: 'hidden' }}>
      <LayoutHeader>
        <HeaderArea />
      </LayoutHeader>
      <Layout>
        <Layout.Sider width={200} theme="light">
          <MaterialArea />
        </Layout.Sider>
        <Layout.Content style={{ overflow: 'auto' }}>
          <SortableArea />
        </Layout.Content>
        <Layout.Sider width={280} theme="light">
          <AttributeArea />
        </Layout.Sider>
      </Layout>
    </Layout>
  );
};

export default Builder;
