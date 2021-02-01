import React from 'react';
import styled from 'styled-components';
import { useAtomState } from '@axe/context';
import { Empty, Popconfirm } from 'antd';
import { DeleteOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { pageDataAtomState, selectedDropItemAtomState } from '../atoms';
import { isPageData, getParentFromPageData } from '../helpers';

const AttrBoard = styled.div`
  height: 100%;
  overflow: auto;
`;
const AttrTitle = styled.div`
  color: #666;
  padding: 5px 10px;
  border-bottom: 1px solid rgba(31, 56, 88, 0.1);
`;
const AttrAction = styled.div`
  background-color: #e9ecf0;

  span {
    padding: 8px;
    color: #666;
    cursor: pointer;

    &:hover {
      color: #008cff;
    }
  }
`;

export interface AttrAreaProps {}

const AttrArea: React.FC<AttrAreaProps> = () => {
  const [pageData, setPageData] = useAtomState(pageDataAtomState);
  const [selectedItem, setSelectedItem] = useAtomState(selectedDropItemAtomState);

  if (selectedItem == null) {
    return (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description="请在画布选择节点"
        style={{ marginTop: 80 }}
      />
    );
  }

  const handleParent = () => {
    const parent = getParentFromPageData(selectedItem, pageData);
    if (parent && !isPageData(parent)) {
      setSelectedItem(parent);
    }
  };
  const handleDelete = () => {
    const parent = getParentFromPageData(selectedItem, pageData);
    if (parent && parent.children) {
      parent.children = parent.children.filter((child) => child.key !== selectedItem.key);
      setPageData({ ...pageData });
    }
  };

  return (
    <AttrBoard>
      <AttrTitle>{selectedItem?.label}</AttrTitle>
      <AttrAction>
        <ArrowUpOutlined title="选中父节点" onClick={handleParent} />
        <Popconfirm title="确定删除选中节点吗？" onConfirm={handleDelete}>
          <DeleteOutlined title="删除选中节点" />
        </Popconfirm>
      </AttrAction>
    </AttrBoard>
  );
};

export default AttrArea;
