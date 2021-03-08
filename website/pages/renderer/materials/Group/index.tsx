import React from 'react';
import { Card } from 'antd';

export interface MyGroupProps {
  title: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const MyGroup: React.FC<MyGroupProps> = ({ title, children, ...restProps }) => {
  return (
    <Card title={title} {...restProps}>
      {children}
    </Card>
  );
};

export default MyGroup;
