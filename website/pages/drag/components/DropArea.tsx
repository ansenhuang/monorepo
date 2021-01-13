import React, { useRef } from 'react';
import styled from 'styled-components';
import { useRootState } from '@axe/context';
import { cloneDeep, uniqueId } from 'lodash';
import { getElementFromTarget } from '../helpers';
import type { DragSource, DragSourceItem } from '../dragsource';

const DropItem = styled.div`
  margin: 10px;
  border: 1px solid #eee;
`;

export interface DropAreaProps {}
export interface DropDataItem extends DragSourceItem {
  id: string;
}
export type DropData = DropDataItem[];

const DropArea: React.FC<DropAreaProps> = () => {
  const [dragSource] = useRootState<DragSource>('dragSource');
  const [dropData, setDropData] = useRootState<DropData>('dropData');
  const ref = useRef<Record<'clone' | 'dropped', HTMLElement> | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    // console.log('dragover');
    e.preventDefault(); // 阻止默认动作以启用drop
    e.dataTransfer.dropEffect = 'copy';
  };
  const handleDragEnter = (e: React.DragEvent) => {
    // console.log('dragenter');
    const target = e.target as HTMLElement;
    const dropped = getElementFromTarget(target, (el) => Boolean(el.dataset.dropid));
    if (dropped) {
      const clone = document.createElement('div');
      clone.textContent = 'clone';
      clone.style.height = '20px';
      clone.style.backgroundColor = '#ccc';
      console.log(dropped);

      dropped.parentElement?.insertBefore(clone, dropped.nextSibling);
      ref.current = {
        clone,
        dropped,
      };
    }
  };
  const handleDragLeave = (e: React.DragEvent) => {
    // console.log('dragleave');
    // const target = e.target as HTMLElement;
    // const dropped = getElementFromTarget(target, el => Boolean(el.dataset.dropid));
    // if (dropped) {
    //   dropped.style.backgroundColor = '';
    // }
    if (ref.current) {
      const { clone } = ref.current;
      clone.remove();
      console.log('leave', clone);

      ref.current = null;
    }
  };
  const handleDrop = (e: React.DragEvent) => {
    // console.log('drop');
    e.preventDefault();
    e.stopPropagation();

    let insertIndex = -1;
    if (ref.current) {
      const { clone, dropped } = ref.current;
      insertIndex = dropData.findIndex((item) => item.id === dropped.dataset.dropid);
      clone.remove();
      ref.current = null;
    }

    const targetName = e.dataTransfer.getData('name');
    const targetDragItem = dragSource.find((item) => item.name === targetName);
    if (targetDragItem) {
      const newDropData = [...dropData];
      const newDropDataItem = {
        ...cloneDeep(targetDragItem),
        id: uniqueId(),
      };
      if (insertIndex === -1) {
        newDropData.push(newDropDataItem);
      } else {
        newDropData.splice(insertIndex + 1, 0, newDropDataItem);
      }
      setDropData(newDropData);
    }
  };

  return (
    <div
      style={{ height: '100%', overflow: 'hidden' }}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {dropData.map((item) => (
        <DropItem key={item.id} data-dropid={item.id}>
          <item.Component {...item.props} />
        </DropItem>
      ))}
    </div>
  );
};

export default DropArea;
