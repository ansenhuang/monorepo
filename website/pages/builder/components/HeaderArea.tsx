import React from 'react';
import styled from 'styled-components';
import { Input, notification } from 'antd';
import { EyeOutlined, SaveOutlined } from '@ant-design/icons';
import { useAtomState } from '@axe/context';
import { pageSchemaState } from '../atoms';
import { setPageSchema, getStringifyPageSchema } from '../helpers';

const Header = styled.div`
  height: 100%;
  display: flex;
`;
const Logo = styled.h1`
  margin: 0;
  width: 200px;
  color: #666;
  text-align: center;
  line-height: 50px;
  cursor: pointer;
`;
const MiddleBox = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;

  span {
    padding: 0 20px;
    line-height: 50px;
    cursor: pointer;
    color: #999;

    &:hover {
      color: #333;
    }
  }
`;
const RightBox = styled.div`
  display: flex;

  /* stylelint-disable no-descending-specificity */
  span {
    font-size: 20px;
    padding: 15px 20px;
    cursor: pointer;
    color: #999;

    &:hover {
      color: #333;
    }
  }
`;

interface HeaderAreaProps {}

const HeaderArea: React.FC<HeaderAreaProps> = () => {
  const [pageSchema] = useAtomState(pageSchemaState);

  const handleSave = () => {
    setPageSchema(pageSchema);
    const showSchema = getStringifyPageSchema(pageSchema, 2);
    notification.success({
      duration: 10,
      message: '页面数据',
      description: <Input.TextArea readOnly rows={20} value={showSchema} />,
    });
  };

  return (
    <Header>
      <Logo>搭建器</Logo>
      <MiddleBox>
        <span style={{ cursor: 'not-allowed' }}>设备</span>
        <span style={{ cursor: 'not-allowed' }}>国际化</span>
      </MiddleBox>
      <RightBox>
        <EyeOutlined style={{ cursor: 'not-allowed' }} />
        <SaveOutlined onClick={handleSave} />
      </RightBox>
    </Header>
  );
};

export default HeaderArea;
