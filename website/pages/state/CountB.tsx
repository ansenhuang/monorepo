import React from 'react';
import { useRootState } from './context';

const Count = () => {
  const [count, setCount] = useRootState('count_b');

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
