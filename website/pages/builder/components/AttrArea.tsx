import React from 'react';

export interface AttrAreaProps {}

const AttrArea: React.FC<AttrAreaProps> = () => {
  return <div style={{ height: '100%', overflow: 'hidden' }}>组件配置项</div>;
};

export default AttrArea;
