import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import ReactSortable from '@axe/sortable';
import { useAtomState } from '@axe/context';
import { Collapse, Input } from 'antd';
import { materialsState } from '../atoms';
import type { MaterialSchema } from '../types';

const StyledCollapse = styled(Collapse)`
  position: relative;
`;
const StyledCollapsePanel = styled(Collapse.Panel)`
  border: 0 !important;

  .ant-collapse-header {
    display: flex;
    align-items: center;
    padding: 6px 12px !important;
    color: #666 !important;

    span {
      position: static !important;
      padding: 0 !important;
      margin-right: 12px;
    }
  }

  .ant-collapse-content-box {
    padding: 0 !important;
    background-color: #fff;
    overflow: hidden;
  }
`;
const SearchBar = styled.div`
  padding: 4px;
  position: relative;
`;
const SearchBarEmpty = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: -34px;
  color: #999;
  text-align: center;
  line-height: 34px;
`;
const SortableList = styled(ReactSortable)`
  height: 100%;
  overflow: auto;
`;
const SortableItem = styled.div`
  margin: 2px;
  line-height: 2;
  text-align: center;
  color: #008cff;
  border: 1px solid #008cff;
  background-color: #fff;
  cursor: grab;
  position: relative;
  z-index: 1;
`;

interface MaterialAreaProps {}

enum materialTypes {
  component = '组件',
  layout = '布局',
  form = '表单',
  builder = '自定义',
}
const noop = () => {};

const MaterialArea: React.FC<MaterialAreaProps> = () => {
  const [materials] = useAtomState(materialsState);
  const [openGroupKeys, setOpenGroupKeys] = useState<string[]>([]);
  const [materialHiddenNames, setMaterialHiddenNames] = useState<string[]>([]);

  const materialGroups = useMemo(() => {
    const map = new Map<string, { title: string; type: string; list: MaterialSchema[] }>();
    materials.forEach((material) => {
      const type = material.type && material.type in materialTypes ? material.type : 'component';
      const group = map.get(type) || { title: materialTypes[type], type, list: [] };
      group.list.push(material);
      map.set(type, group);
    });
    return Array.from(map.values());
  }, [materials]);

  const handleSearch = (keywords: string) => {
    if (keywords) {
      const hiddenNames = materials
        .map((material) => {
          const { label, name } = material;
          if (!label.includes(keywords) && !name.toLowerCase().includes(keywords.toLowerCase())) {
            return name;
          }
          return '';
        })
        .filter(Boolean);
      setMaterialHiddenNames(hiddenNames);
    } else {
      setMaterialHiddenNames([]);
    }
  };
  const handleOpenKeysChange = (keys: string | string[]) => {
    const nextKeys = Array.isArray(keys) ? keys : [keys];
    setOpenGroupKeys(nextKeys);
  };

  useEffect(() => {
    setOpenGroupKeys(materialGroups.map((group) => group.type));
  }, [materialGroups]);

  return (
    <>
      <SearchBar>
        <Input placeholder="搜索组件" allowClear onChange={(e) => handleSearch(e.target.value)} />
        <SearchBarEmpty>暂无搜索结果</SearchBarEmpty>
      </SearchBar>
      <StyledCollapse bordered={false} activeKey={openGroupKeys} onChange={handleOpenKeysChange}>
        {materialGroups.map((group) => {
          const visibleList = group.list.filter((item) => !materialHiddenNames.includes(item.name));

          return visibleList.length > 0 ? (
            <StyledCollapsePanel key={group.type} header={group.title}>
              <SortableList
                group={{
                  name: 'material',
                  pull: 'clone',
                  put: false,
                }}
                sort={false}
                animation={150}
                items={visibleList}
                draggable={'.' + SortableItem.styledComponentId}
                setItems={noop}
              >
                {visibleList.map((material) => (
                  <SortableItem key={material.name}>{material.label}</SortableItem>
                ))}
              </SortableList>
            </StyledCollapsePanel>
          ) : null;
        })}
      </StyledCollapse>
    </>
  );
};

export default MaterialArea;
