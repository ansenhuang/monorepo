import React, { useRef } from 'react';
import styled from 'styled-components';
import { useAtomState } from '@axe/context';
import { cloneDeep, uniqueId } from 'lodash';
import { dragSourceAtomState, dropDataAtomState, cloneElementAtomState } from '../atoms';
import { getElementFromTarget } from '../helpers';

const DropItem = styled.div`
  margin: 10px;
  border: 1px solid #eee;
`;

export interface DropAreaProps {}

const DropArea: React.FC<DropAreaProps> = () => {
  const [dragSource] = useAtomState(dragSourceAtomState);
  const [dropData, setDropData] = useAtomState(dropDataAtomState);
  const [cloneEl] = useAtomState(cloneElementAtomState);

  const dropRef = useRef<HTMLDivElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // 阻止默认动作以启用drop
    e.dataTransfer.dropEffect = 'copy';

    const targetEl = e.target as HTMLElement;

    if (!cloneEl || targetEl === cloneEl) return;

    const itemEl = getElementFromTarget(targetEl, (el) => Boolean(el.dataset.dropid));
    if (itemEl) {
      const y = e.clientY;
      const rect = itemEl.getBoundingClientRect();
      const isAfter = y > (rect.top + rect.bottom) / 2;
      if (isAfter) {
        if (itemEl.nextElementSibling) {
          itemEl.parentElement?.insertBefore(cloneEl, itemEl.nextElementSibling);
        } else {
          itemEl.parentElement?.appendChild(cloneEl);
        }
      } else {
        itemEl.parentElement?.insertBefore(cloneEl, itemEl);
      }
    } else {
      // const dropEl = dropRef.current;
      // if (dropEl) {
      //   dropEl.appendChild(cloneEl);
      // }
    }
  };
  const handleDragLeave = (e: React.DragEvent) => {
    const dropEl = dropRef.current;
    if (dropEl) {
      const targetEl = e.target as HTMLElement;
      if (targetEl === dropEl || !dropEl.contains(targetEl)) {
        cloneEl?.remove();
      }
    }
  };

  /*
  const handleDragEnter = (e: React.DragEvent) => {
    // console.log('dragenter');
    const target = e.target as HTMLElement;
    const dropArea = document.getElementById('DropArea');
    if (target === dropArea) {
      dropArea.appendChild(clone);
      refStore.
      ref.current = {
        clone,
        dropped: dropArea,
      };
      return;
    }

    const dropped = getElementFromTarget(target, (el) => Boolean(el.dataset.dropid));
    if (dropped) {
      // console.log('dropped', dropped.dataset.dropid);
      const rect = dropped.getBoundingClientRect();
      const clentY = e.clientY;
      const isAfter = clentY >= (rect.top + rect.bottom / 2);
      if (isAfter) {
        if (dropped.nextElementSibling) {
          dropped.parentElement?.insertBefore(clone, dropped.nextElementSibling);
        } else {
          dropped.parentElement?.appendChild(clone);
        }
      } else {
        dropped.parentElement?.insertBefore(clone, dropped);
      }


      ref.current = {
        clone,
        dropped,
      };
    }
  };
  const handleDragLeave = (e: React.DragEvent) => {
    // console.log('dragleave', e.target);
    // const target = e.target as HTMLElement;
    // const dropped = getElementFromTarget(target, el => Boolean(el.dataset.dropid));
    // if (dropped) {
    //   dropped.style.backgroundColor = '';
    // }
    if (ref.current) {
      const { clone, dropped } = ref.current;
      const target = e.target as HTMLElement;
      // console.log(target);

      if (dropped === target || !dropped.contains(target)) {
        clone.remove();
        // console.log('leave');

        ref.current = null;
      }
    }
  };
  */

  const handleDrop = (e: React.DragEvent) => {
    // console.log('drop');
    e.preventDefault();
    e.stopPropagation();

    if (!cloneEl) return;

    handleDragLeave(e);

    const targetName = e.dataTransfer.getData('name');
    const targetDragItem = dragSource.find((item) => item.name === targetName);
    if (targetDragItem) {
      const newDropData = [...dropData];
      const newDropDataItem = {
        ...cloneDeep(targetDragItem),
        id: uniqueId(),
      };
      const insertIndex = Array.from(cloneEl.parentElement?.children || []).findIndex(
        (child) => child === cloneEl,
      );
      if (insertIndex === -1) {
        newDropData.push(newDropDataItem);
      } else {
        newDropData.splice(insertIndex, 0, newDropDataItem);
      }
      setDropData(newDropData);
    }
  };

  return (
    <div
      ref={dropRef}
      style={{ height: '100%', overflow: 'hidden' }}
      onDragOver={handleDragOver}
      // onDragEnter={handleDragEnter}
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
