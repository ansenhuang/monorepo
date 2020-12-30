import React, { useState, useEffect } from 'react';
import { RootProvider } from '@axe/context';
import CountA from './CountA';
import CountB from './CountB';
import styles from './index.module.css';

const Page = () => {
  console.log('render Page');

  const [visible, setVisible] = useState(true);

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
        initialValue={{
          count_a: 0,
          count_b: 100,
        }}
      >
        <CountA />
        <CountB />
        {visible && <CountA />}
      </RootProvider>
    </div>
  );
};

export default Page;
