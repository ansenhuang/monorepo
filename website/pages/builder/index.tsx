import React from 'react';
import styled from 'styled-components';
import { Layout } from 'antd';
import HeaderArea from './components/HeaderArea';
import DragArea from './components/DragArea';
import DropArea from './components/DropArea';
import AttrArea from './components/AttrArea';

const LayoutHeader = styled(Layout.Header)`
  padding: 0;
  height: 50px;
  background-color: #fff;
  border-bottom: 1px solid rgba(31, 56, 88, 0.1);
`;

const Page = () => {
  return (
    <Layout style={{ height: '100vh', overflow: 'hidden' }}>
      <LayoutHeader>
        <HeaderArea />
      </LayoutHeader>
      <Layout>
        <Layout.Sider width={200} theme="light">
          <DragArea />
        </Layout.Sider>
        <Layout.Content style={{ overflow: 'auto' }}>
          <DropArea />
        </Layout.Content>
        <Layout.Sider width={280} theme="light">
          <AttrArea />
        </Layout.Sider>
      </Layout>
    </Layout>
  );
};

export default Page;
