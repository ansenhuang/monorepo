import React from 'react';
import styled from 'styled-components';
import ReactSortable from '@axe/sortable';
import { useAtomState } from '@axe/context';
import { materialsState } from '../atoms';

const SortableList = styled(ReactSortable)`
  height: 100%;
  overflow: auto;
`;
const SortableItem = styled.div`
  margin: 2px;
  line-height: 2;
  text-align: center;
  color: #008cff;
  border: 1px solid #008cff;
  background-color: #fff;
  cursor: grab;
  position: relative;
  z-index: 1;
`;

interface MaterialAreaProps {}

const MaterialArea: React.FC<MaterialAreaProps> = () => {
  const [materials, setMaterials] = useAtomState(materialsState);

  return (
    <SortableList
      group={{
        name: 'material',
        pull: 'clone',
      }}
      sort={false}
      animation={150}
      items={materials}
      setItems={setMaterials as any}
    >
      {materials.map((material) => (
        <SortableItem key={material.name}>{material.label}</SortableItem>
      ))}
    </SortableList>
  );
};

export default MaterialArea;
