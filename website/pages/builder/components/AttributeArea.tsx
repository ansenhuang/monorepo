import React from 'react';
import styled from 'styled-components';
import { Tabs, Empty } from 'antd';
import { useAtomState } from '@axe/context';
import { selectedNodeState } from '../atoms';
import AttributeForm from './AttributeForm';
import OutlineTree from './OutlineTree';

const StyledTabs = styled(Tabs)`
  height: 100%;
  display: flex;
  flex-direction: column;

  .ant-tabs-nav {
    margin: 0;
  }

  .ant-tabs-content-holder {
    flex-grow: 1;
    overflow: auto;
  }
`;

interface AttributeAreaProps {}

const AttributeArea: React.FC<AttributeAreaProps> = () => {
  const [selectedNodeStore] = useAtomState(selectedNodeState);

  return (
    <StyledTabs type="card" size="small">
      <Tabs.TabPane tab="组件属性" key="attribute">
        {selectedNodeStore ? (
          <AttributeForm />
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="请在左侧画布选中节点"
            style={{ marginTop: 100 }}
          />
        )}
      </Tabs.TabPane>
      <Tabs.TabPane tab="大纲树" key="outline">
        <OutlineTree />
      </Tabs.TabPane>
    </StyledTabs>
  );
};

export default AttributeArea;
