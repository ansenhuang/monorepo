import React from 'react';
import styled from 'styled-components';
import { Link } from '@axe/router';
import routes from 'src/constants/routes';
import logo from './logo.svg';
import styles from './index.module.css';

// !test: styled
export const Div = styled.div`
  background-color: red;
`;

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
