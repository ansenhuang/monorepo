import React, { useState, useEffect } from 'react';
import CountA from './CountA';
import CountA2 from './CountA2';
import CountB from './CountB';
import Content from './Content';
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
      <CountA />
      <CountB />
      {visible && <CountA2 />}
      <Content />
    </div>
  );
};

export default Page;
