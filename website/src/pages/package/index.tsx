import React from 'react';
import Button from '@huangancheng/core';
import styles from './index.module.css';

const Page = () => {
  return (
    <div className={styles['page']}>
      <Button>Button from packages</Button>
    </div>
  );
};

export default Page;
