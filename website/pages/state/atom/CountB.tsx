import React from 'react';
import { useAtomState } from '@axe/context';
import { countBAtomState } from './atoms';

const Count = () => {
  const [count, setCount] = useAtomState(countBAtomState);

  console.log('render B', count);

  return (
    <div
      style={{ textAlign: 'center', lineHeight: 5, backgroundColor: 'blue' }}
      onClick={() => setCount(count + 1)}
    >
      B: {count}
    </div>
  );
};

export default Count;
