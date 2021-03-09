import React from 'react';
import { Card } from 'antd';

export interface MyGroupProps {
  [key: string]: any;
}

const MyGroup: React.FC<MyGroupProps> = (props) => {
  return <Card {...props} />;
};

export default MyGroup;
