import React from 'react';
import produce from 'immer';
import Form from '@axe/form';
import { useAtomState } from '@axe/context';
import { pageSchemaState, materialsState, selectedNodeState } from '../atoms';
import { getTargetFromTree } from '../helpers';

interface AttributeFormProps {}

const AttributeForm: React.FC<AttributeFormProps> = () => {
  const [pageSchema, setPageSchema] = useAtomState(pageSchemaState);
  const [materials] = useAtomState(materialsState);
  const [selectedNodeStore] = useAtomState(selectedNodeState);

  if (selectedNodeStore == null) {
    return null;
  }

  const { node: selectedNode, paths } = selectedNodeStore;
  const { propsSchema = {} } =
    materials.find((material) => material.name === selectedNode.name) || {};
  const formSchemaItems = Object.entries(propsSchema).map(([name, value]) => {
    // form顶层已写入当前值，这里将默认值置为空
    return { ...value, name, initialValue: undefined };
  });

  const handleValuesChange = (changedValues: any, allValues: any) => {
    const nextPageSchema = produce(pageSchema, (draftSchema) => {
      const target = getTargetFromTree(draftSchema, paths || []);
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
    <Form
      key={selectedNode.key}
      style={{ padding: 10 }}
      items={formSchemaItems}
      initialValues={selectedNode.props}
      onValuesChange={handleValuesChange}
    />
  );
};

export default AttributeForm;
