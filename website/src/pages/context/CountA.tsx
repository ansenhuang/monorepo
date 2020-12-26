import React from 'react';
import { useRootState } from '@axe/context';

const Count = () => {
  const [count, setCount] = useRootState('count_a');

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
