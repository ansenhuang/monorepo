import React from 'react';
import styled from 'styled-components';
import { useAtomState } from '@axe/context';
import { dragSourceAtomState, cloneElementAtomState } from '../atoms';
import { createHTMLElement } from '../helpers';

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
  const [dragSource] = useAtomState(dragSourceAtomState);
  const [cloneEl, setCloneEl] = useAtomState(cloneElementAtomState);

  const handleDrag = (e: React.DragEvent) => {
    // console.log('drag');
  };
  const handleDragStart = (e: React.DragEvent) => {
    // console.log('dragstart');
    const el = e.target as HTMLElement;
    el.style.opacity = '0.5';
    e.dataTransfer.setData('name', el.dataset.name || '');
    setCloneEl(createHTMLElement());
  };
  const handleDragEnd = (e: React.DragEvent) => {
    // console.log('dragend');
    const el = e.target as HTMLElement;
    el.style.opacity = '';
    setCloneEl(null);
    cloneEl?.remove();
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
