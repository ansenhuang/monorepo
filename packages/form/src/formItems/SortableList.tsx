import React from 'react';
import styled from 'styled-components';
import { Input, Button, InputProps } from 'antd';
import { DragOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import ReactSortable from '@axe/sortable';

const Wrapper = styled.div`
  position: relative;
`;
const SortableItem = styled.div`
  display: flex;
  margin-bottom: 10px;

  > span {
    font-size: 16px;
    color: #666;
    padding: 8px;
  }
`;
const StyledDragIcon = styled(DragOutlined)`
  cursor: move;
`;

interface SortableItemValue {
  key: string | number;
  value?: string;
}
interface SortableListProps extends Omit<InputProps, 'value' | 'onChange'> {
  value?: SortableItemValue[];
  onChange?: (newValue: SortableItemValue[]) => void;
  style?: React.CSSProperties;
  className?: string;
}

const SortableList: React.FC<SortableListProps> = ({
  value = [],
  onChange = () => {},
  style,
  className,
  ...inputProps
}) => {
  const handleAdd = () => {
    const newValue = [...value, { key: Date.now(), value: '' }];
    onChange?.(newValue);
  };
  const handleDelete = (index: number) => {
    const newValue = [...value];
    newValue.splice(index, 1);
    onChange?.(newValue);
  };
  const handleChange = (index: number, changedValue: string) => {
    const newValue = [...value];
    newValue[index] = { ...newValue[index], value: changedValue };
    onChange?.(newValue);
  };
  const handleSort = (newValue: SortableItemValue[]) => {
    onChange?.(newValue);
  };

  return (
    <Wrapper className={className} style={style}>
      <ReactSortable
        group={{
          name: 'form_sortable_list',
          pull: false,
          put: false,
        }}
        sort
        animation={150}
        draggable={'.' + SortableItem.styledComponentId}
        handle={'.' + (StyledDragIcon as any).styledComponentId}
        items={value}
        setItems={handleSort}
      >
        {value.map((item, index) => (
          <SortableItem key={item.key}>
            <StyledDragIcon />
            <Input
              {...inputProps}
              value={item.value}
              onChange={(e) => handleChange(index, e.target.value)}
            />
            <DeleteOutlined onClick={() => handleDelete(index)} />
          </SortableItem>
        ))}
      </ReactSortable>
      <Button type="dashed" block icon={<PlusOutlined />} onClick={handleAdd}>
        添加
      </Button>
    </Wrapper>
  );
};

export default SortableList;
