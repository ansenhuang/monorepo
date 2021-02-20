import React from 'react';
import { useRootState } from './context';

const Count = () => {
  const [count, setCount] = useRootState('count_a');

  console.log('render A2', count);

  return (
    <div
      style={{ textAlign: 'center', lineHeight: 5, backgroundColor: 'red' }}
      onClick={() => setCount(count + 1)}
    >
      A2: {count}
    </div>
  );
};

export default Count;
