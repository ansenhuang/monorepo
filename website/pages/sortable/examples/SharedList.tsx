import React, { useState } from 'react';
import ReactSortable from '@axe/sortable';
import { getExampleItems } from '../helpers';

const initialSharedItems = getExampleItems();
const initialDroppingItems = getExampleItems();

const SharedList = () => {
  const [sharedItems, setSharedItems] = useState(initialSharedItems);
  const [droppingItems, setDroppingItems] = useState(initialDroppingItems);

  console.log(
    'shared',
    sharedItems.map((item) => item.key),
    droppingItems.map((item) => item.key),
  );

  return (
    <div style={{ display: 'flex' }}>
      <ReactSortable
        group={{
          name: 'shared',
          pull: true,
        }}
        className="list"
        style={{ width: '50%' }}
        animation={150}
        ghostClass="bg-blue"
        items={sharedItems}
        setItems={setSharedItems}
      >
        {sharedItems.map((item) => (
          <div key={item.key} className="item" style={{ backgroundColor: '#fff6b2' }}>
            {item.name}
          </div>
        ))}
      </ReactSortable>
      <ReactSortable
        group={{
          name: 'dropping',
          put: true,
        }}
        className="list"
        style={{ width: '50%' }}
        animation={150}
        ghostClass="bg-blue"
        items={droppingItems}
        setItems={setDroppingItems}
      >
        {droppingItems.map((item) => (
          <div key={item.key} className="item">
            {item.name}
          </div>
        ))}
      </ReactSortable>
    </div>
  );
};

export default SharedList;
