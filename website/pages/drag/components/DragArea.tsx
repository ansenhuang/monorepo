import React from 'react';
import styled from 'styled-components';
import { useRootState } from '@axe/context';
import type { DragSource } from '../dragsource';

const DragItem = styled.div`
  margin: 10px;
  line-height: 2;
  text-align: center;
  color: #666;
  border: 1px solid #eee;
  cursor: grab;
`;

export interface DragAreaProps {}

const DragArea: React.FC<DragAreaProps> = () => {
  const [dragSource] = useRootState<DragSource>('dragSource');

  const handleDrag = (e: React.DragEvent) => {
    // console.log('drag');
  };
  const handleDragStart = (e: React.DragEvent) => {
    // console.log('dragstart');
    const el = e.target as HTMLElement;
    el.style.opacity = '0.5';
    e.dataTransfer.setData('name', el.dataset.name || '');
  };
  const handleDragEnd = (e: React.DragEvent) => {
    // console.log('dragend');
    const el = e.target as HTMLElement;
    el.style.opacity = '';
  };

  return (
    <div
      style={{ height: '100%', overflow: 'hidden' }}
      onDrag={handleDrag}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {dragSource.map((item) => (
        <DragItem key={item.name} draggable data-name={item.name}>
          {item.label}
        </DragItem>
      ))}
    </div>
  );
};

export default DragArea;
