import React from 'react';
import styled from 'styled-components';
import ReactSortable from '@axe/sortable';
import { useAtomState } from '@axe/context';
import { dropDataAtomState } from '../atoms';

const DropItem = styled.div`
  margin: 10px;
  border: 1px solid #eee;
  position: relative;
`;
const DropLayer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1;
  cursor: grab;
`;

export interface DropAreaProps {}

const DropArea: React.FC<DropAreaProps> = () => {
  const [dropData, setDropData] = useAtomState(dropDataAtomState);

  return (
    <ReactSortable
      group={{
        name: 'drop',
        put: true,
      }}
      animation={150}
      style={{ height: '100%', overflow: 'hidden' }}
      items={dropData}
      setItems={setDropData}
      cloneItem={(item) => ({ ...item, key: item.key + '_' + Date.now() })}
    >
      {dropData.map((item) => (
        <DropItem key={item.key}>
          <DropLayer />
          <item.Component {...item.props} />
        </DropItem>
      ))}
    </ReactSortable>
  );
};

export default DropArea;
