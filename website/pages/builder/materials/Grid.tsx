import React, { useEffect } from 'react';
import { Row, Col } from 'antd';
import { getTargetFromTree, normalizeNodeScheme } from '../helpers';
import type { BuilderComponent, CoreNodeSchema } from '../types';

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

const Grid: BuilderComponent = ({ schema, paths, updatePageSchema, renderSortable }) => {
  const { props, children } = schema;
  const { cols, ...rowProps } = props;
  const colNodes = Array.isArray(children) ? children : [];
  const colPaths = [...paths, 'children'];

  useEffect(() => {
    /* eslint-disable react-hooks/exhaustive-deps */
    updatePageSchema((draftSchema) => {
      const target = getTargetFromTree(draftSchema, colPaths);
      if (target) {
        const { current, key } = target;
        const span = Math.floor(24 / cols);
        for (let i = 0; i < cols; i++) {
          if (current[key][i]) {
            current[key][i].props.span = span;
          } else {
            const coreCol = getCoreNodeScheme('Col', '列', { span });
            current[key][i] = normalizeNodeScheme(coreCol);
          }
        }
      } else {
        console.warn('节点路径错误，无法更新目标节点', colPaths);
      }
    });
  }, [cols]);

  return (
    <Row {...rowProps}>
      {[...Array(cols)].map((_, index) => {
        const node = colNodes[index];
        return node ? (
          <Col key={node.key} {...node.props}>
            {renderSortable(node, [...colPaths, String(index)])}
          </Col>
        ) : null;
      })}
    </Row>
  );
};

Grid.__getInitialNodeSchema = (node) => {
  const { props, children } = node;
  const rowChildren = Array.isArray(children) ? children : [];
  const { span = 12 } = rowChildren[0]?.props || {};
  const cols = Math.floor(24 / span);
  const gridProps = { ...props, cols };
  const coreGrid = getCoreNodeScheme('Grid', '栅格', gridProps);
  const grid = normalizeNodeScheme(coreGrid);
  grid.children = rowChildren;
  return grid;
};

Grid.__getFinalNodeSchema = (node) => {
  const { props, children } = node;
  const { cols, ...rowProps } = props;
  const rowChildren = (Array.isArray(children) ? children : []).slice(0, cols);
  const coreRow = getCoreNodeScheme('Row', '行', rowProps);
  const row = normalizeNodeScheme(coreRow);
  row.builderName = 'Grid';
  row.children = rowChildren;
  return row;
};

export default Grid;
