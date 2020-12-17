import React from 'react';
import logo from './logo.svg';
import styles from './index.module.css';
import { Link } from '../../router';

const Page = () => {
  return (
    <div className={styles['app']}>
      <header className={styles['app-header']}>
        <img src={logo} className={styles['app-logo']} alt="logo" />
        <Link to="/package">package</Link>
      </header>
    </div>
  );
};

export default Page;
