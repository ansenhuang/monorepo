import React from 'react';
import { Link } from '@axe/router';
import routes from 'src/constants/routes';
import logo from './logo.svg';
import styles from './index.module.css';

const Page = () => {
  return (
    <div className={styles['app']}>
      <header className={styles['app-header']}>
        <img src={logo} className={styles['app-logo']} alt="logo" />
        <div className={styles['app-routes']}>
          {routes.map(({ name, props: { path } }) => (
            <Link key={path} to={path}>
              {name}
            </Link>
          ))}
        </div>
      </header>
    </div>
  );
};

export default Page;
