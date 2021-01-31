import React, { useState } from 'react';
import ReactSortable from '@axe/sortable';
import { getExampleItems } from '../helpers';

const initialCloningItems = getExampleItems();
const initialDroppingItems = getExampleItems();

const CloningList = () => {
  const [cloningItems, setCloningItems] = useState(initialCloningItems);
  const [droppingItems, setDroppingItems] = useState(initialDroppingItems);

  console.log(
    'cloning',
    cloningItems.map((item) => item.key),
    droppingItems.map((item) => item.key),
  );

  return (
    <div style={{ display: 'flex' }}>
      <ReactSortable
        group={{
          name: 'cloning',
          pull: 'clone',
        }}
        className="list"
        style={{ width: '50%' }}
        animation={150}
        ghostClass="bg-blue"
        items={cloningItems}
        setItems={setCloningItems}
      >
        {cloningItems.map((item) => (
          <div key={item.key} className="item" style={{ backgroundColor: '#fff6b2' }}>
            {item.key}
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
        cloneItem={(item) => ({ ...item, key: item.key + '_' + Date.now() })}
      >
        {droppingItems.map((item) => (
          <div key={item.key} className="item">
            {item.key}
          </div>
        ))}
      </ReactSortable>
    </div>
  );
};

export default CloningList;
