import React from 'react';
import styled from 'styled-components';
import ReactSortable from '@axe/sortable';
import { useAtomState } from '@axe/context';
import { dragSourceAtomState } from '../atoms';

const DragItem = styled.div`
  margin: 10px;
  line-height: 2;
  text-align: center;
  color: #666;
  border: 1px solid #eee;
  cursor: grab;
  background-color: #fff;
`;

export interface DragAreaProps {}

const DragArea: React.FC<DragAreaProps> = () => {
  const [dragSource, setDragSource] = useAtomState(dragSourceAtomState);

  return (
    <ReactSortable
      group={{
        name: 'drag',
        pull: 'clone',
      }}
      sort={false}
      animation={150}
      style={{ height: '100%', overflow: 'hidden' }}
      items={dragSource}
      setItems={setDragSource}
    >
      {dragSource.map((item) => (
        <DragItem key={item.key}>{item.label}</DragItem>
      ))}
    </ReactSortable>
  );
};

export default DragArea;
