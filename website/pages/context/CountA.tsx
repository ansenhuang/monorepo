import React from 'react';
import { useAtomState } from '@axe/context';
import { countAAtomState } from './atoms';

const Count = () => {
  const [count, setCount] = useAtomState(countAAtomState);

  console.log('render A', count);

  return (
    <div
      style={{ textAlign: 'center', lineHeight: 5, backgroundColor: 'red' }}
      onClick={() => setCount(count + 1)}
    >
      A: {count}
    </div>
  );
};

export default Count;
