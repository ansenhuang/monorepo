import React, { useEffect } from 'react';
import { Tabs } from './basic';
import { getTargetFromTree, normalizeNodeScheme } from '../helpers';
import type { BuilderComponent, CoreNodeSchema } from '../types';

const { TabPane } = Tabs;

const getCoreNodeScheme = (
  name: string,
  label: string,
  props: Record<string, any> = {},
): CoreNodeSchema => ({
  name,
  label,
  props,
  children: [],
});

const Tab: BuilderComponent = ({ schema, paths, updatePageSchema, renderSortable }) => {
  const { props, children } = schema;
  const { tabPanes, style, ...tabsProps } = props;
  const tabPaneNodes = Array.isArray(children) ? children : [];
  const tabPanePaths = [...paths, 'children'];

  useEffect(() => {
    /* eslint-disable react-hooks/exhaustive-deps */
    updatePageSchema((draftSchema) => {
      const target = getTargetFromTree(draftSchema, tabPanePaths);
      if (target) {
        const { current, key } = target;
        const childrenMap = new Map();

        current[key].forEach((item: any) => {
          childrenMap.set(item.props.key, item.children);
        });

        tabPanes.forEach((tabPane: any, index: number) => {
          const tabPaneProps = { key: tabPane.key, tab: tabPane.value };
          if (current[key][index]) {
            Object.assign(current[key][index].props, tabPaneProps);
            const oldChildren = childrenMap.get(tabPaneProps.key);
            if (oldChildren) {
              current[key][index].children = oldChildren;
            }
          } else {
            const coreTabPane = getCoreNodeScheme('TabPane', '标签项', tabPaneProps);
            current[key][index] = normalizeNodeScheme(coreTabPane);
          }
        });
      } else {
        console.warn('节点路径错误，无法更新目标节点', tabPanePaths);
      }
    });
  }, [tabPanes]);

  return (
    <Tabs style={{ backgroundColor: '#fff', ...style }} {...tabsProps}>
      {(tabPanes || []).map((_: any, index: number) => {
        const node = tabPaneNodes[index];
        return node?.visible ? (
          <TabPane key={node.key} {...node.props} tab={node.props.tab || '--'}>
            {renderSortable(node, [...tabPanePaths, String(index)])}
          </TabPane>
        ) : null;
      })}
    </Tabs>
  );
};

Tab.__getInitialNodeSchema = (node) => {
  const { props, children } = node;
  const tabPaneChildren = Array.isArray(children) ? children : [];
  const tabPanes = tabPaneChildren.map((child) => ({
    key: child.props.key,
    value: child.props.tab,
  }));
  const tabsProps = { ...props, tabPanes };
  const coreTab = getCoreNodeScheme('Tab', '选项卡', tabsProps);
  const tab = normalizeNodeScheme(coreTab);
  tab.children = tabPaneChildren;
  return tab;
};

Tab.__getFinalNodeSchema = (node) => {
  const { props, children } = node;
  const { tabPanes = [], ...tabsProps } = props;
  const tabPaneChildren = (Array.isArray(children) ? children : []).slice(0, tabPanes.length);
  const coreTabs = getCoreNodeScheme('Tabs', '选项卡', tabsProps);
  const tabs = normalizeNodeScheme(coreTabs);
  tabs.builderName = 'Tab';
  tabs.children = tabPaneChildren;
  return tabs;
};

export default Tab;
