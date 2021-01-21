import React, { useState, useEffect } from 'react';
import { RootProvider } from './context';
import CountA from './CountA';
import CountA2 from './CountA2';
import CountB from './CountB';
import styles from './index.module.css';

const Page = () => {
  console.log('render Page');

  const [visible, setVisible] = useState(true);
  const stateA = useState(0);
  const stateB = useState(100);

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        setVisible(!visible);
      }
    };
    window.addEventListener('keydown', listener);

    return () => {
      window.removeEventListener('keydown', listener);
    };
  }, [visible]);

  return (
    <div className={styles['page']}>
      <RootProvider
        value={{
          count_a: stateA,
          count_b: stateB,
        }}
      >
        <CountA />
        <CountB />
        {visible && <CountA2 />}
      </RootProvider>
    </div>
  );
};

export default Page;
