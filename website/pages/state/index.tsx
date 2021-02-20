import React from 'react';
import { Tabs } from 'antd';
import AtomContent from './atom';
import ContextContent from './context';

const Page = () => {
  return (
    <Tabs centered>
      <Tabs.TabPane key="atom" tab="原子状态">
        <AtomContent />
      </Tabs.TabPane>
      <Tabs.TabPane key="context" tab="常规状态">
        <ContextContent />
      </Tabs.TabPane>
    </Tabs>
  );
};

export default Page;
