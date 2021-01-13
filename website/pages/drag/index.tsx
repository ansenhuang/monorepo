import React from 'react';
import { Layout } from 'antd';
import { RootProvider } from '@axe/context';
import dragSource from './dragsource';
import DragArea from './components/DragArea';
import DropArea from './components/DropArea';
import SetterArea from './components/SetterArea';

const Page = () => {
  return (
    <RootProvider
      initialValue={{
        dragSource,
        dropData: [],
      }}
    >
      <Layout style={{ height: '100vh', overflow: 'hidden' }}>
        <Layout.Header
          style={{ height: 50, backgroundColor: '#fff', borderBottom: '1px solid #ccc' }}
        >
          <h1 style={{ margin: 0, lineHeight: '50px' }}>搭建器</h1>
        </Layout.Header>
        <Layout>
          <Layout.Sider width={200} theme="light">
            <DragArea />
          </Layout.Sider>
          <Layout.Content>
            <DropArea />
          </Layout.Content>
          <Layout.Sider width={200} theme="light">
            <SetterArea />
          </Layout.Sider>
        </Layout>
      </Layout>
    </RootProvider>
  );
};

export default Page;
