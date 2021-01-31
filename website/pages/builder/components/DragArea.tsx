import React from 'react';
import styled from 'styled-components';
import ReactSortable from '@axe/sortable';
import { useAtomState } from '@axe/context';
import { dragSourceAtomState } from '../atoms';

const DragBox = styled(ReactSortable)`
  height: 100%;
  overflow: auto;
`;
const DragItem = styled.div`
  margin: 10px;
  line-height: 2;
  text-align: center;
  color: #008cff;
  border: 1px solid #008cff;
  background-color: #fff;
  cursor: grab;
  position: relative;
  z-index: 1;
`;

export interface DragAreaProps {}

const DragArea: React.FC<DragAreaProps> = () => {
  const [dragSource, setDragSource] = useAtomState(dragSourceAtomState);

  return (
    <DragBox
      group={{
        name: 'drag',
        pull: 'clone',
      }}
      sort={false}
      animation={150}
      items={dragSource}
      setItems={setDragSource as any}
    >
      {dragSource.map((item) => (
        <DragItem key={item.key}>{item.label}</DragItem>
      ))}
    </DragBox>
  );
};

export default DragArea;
