import React from 'react';
import { Card } from 'antd';

export interface MyGroupProps {
  title: string;
  children?: React.ReactNode;
}

const MyGroup: React.FC<MyGroupProps> = ({ title, children }) => {
  return <Card title={title}>{children}</Card>;
};

export default MyGroup;
