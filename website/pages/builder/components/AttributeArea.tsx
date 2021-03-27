import React from 'react';
import styled from 'styled-components';
import produce from 'immer';
import { Empty } from 'antd';
import Form from '@axe/form';
import { useAtomState } from '@axe/context';
import { pageSchemaState, materialsState, selectedNodeState } from '../atoms';
import { getTargetFromTree } from '../helpers';

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const Title = styled.div`
  padding: 0 10px;
  font-size: 12px;
  color: #666;
  line-height: 36px;
  border-bottom: 1px solid #f0f0f0;
`;
const Content = styled.div`
  flex-grow: 1;
  padding: 10px;
  overflow: auto;
`;

interface AttributeAreaProps {}

const AttributeArea: React.FC<AttributeAreaProps> = () => {
  const [pageSchema, setPageSchema] = useAtomState(pageSchemaState);
  const [materials] = useAtomState(materialsState);
  const [selectedNodeStore] = useAtomState(selectedNodeState);

  if (selectedNodeStore == null) {
    return (
      <Wrapper>
        <Title>未选中</Title>
        <Content>
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="请在左侧画布选中节点"
            style={{ marginTop: 100 }}
          />
        </Content>
      </Wrapper>
    );
  }

  const { node: selectedNode, paths } = selectedNodeStore;
  const { propsSchema = {} } =
    materials.find((material) => material.name === selectedNode.name) || {};
  const formSchemaItems = Object.entries(propsSchema).map(([name, value]) => {
    return { name, ...value };
  });

  const handleValuesChange = (changedValues: any, allValues: any) => {
    const nextPageSchema = produce(pageSchema, (draftSchema) => {
      const target = getTargetFromTree(draftSchema, paths);
      if (target) {
        const { current, key } = target;
        current[key].props = allValues;
      } else {
        console.warn('节点路径错误，无法更新目标节点', paths);
      }
    });
    setPageSchema(nextPageSchema);
  };

  return (
    <Wrapper>
      <Title>{selectedNode.label}</Title>
      <Content>
        <Form key={selectedNode.key} items={formSchemaItems} onValuesChange={handleValuesChange} />
      </Content>
    </Wrapper>
  );
};

export default AttributeArea;
