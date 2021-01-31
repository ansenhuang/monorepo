import React, { useState } from 'react';
import ReactSortable from '@axe/sortable';
import { getExampleItems } from '../helpers';

const initialItems = getExampleItems();

const SimpleList = () => {
  const [items, setItems] = useState(initialItems);

  console.log(
    'simple',
    items.map((item) => item.key),
  );

  return (
    <ReactSortable
      className="list"
      animation={150}
      ghostClass="bg-blue"
      items={items}
      setItems={setItems}
    >
      {items.map((item) => (
        <div key={item.key} className="item">
          {item.key}
        </div>
      ))}
    </ReactSortable>
  );
};

export default SimpleList;
