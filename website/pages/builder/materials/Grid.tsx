import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import { getTargetFromTree, normalizeNodeScheme } from '../helpers';
import type { BuilderComponent, CoreNodeSchema, NodeSchema } from '../types';

const getRowNodeSchema = (props: Record<string, any> = {}): CoreNodeSchema => {
  return {
    name: 'Row',
    label: '行',
    props,
    children: [],
  };
};
const getColNodeSchema = (props: Record<string, any> = {}): CoreNodeSchema => {
  return {
    name: 'Col',
    label: '列',
    props,
    children: [],
  };
};

const Grid: BuilderComponent = ({ schema, paths, updatePageSchema, renderSortable }) => {
  const { props, children } = schema;

  const [currentProps, setCurrentProps] = useState<Record<string, any>>(props);

  const { cols, ...rowProps } = currentProps;
  const colNodes: NodeSchema[] = (children as any).children || [];
  const colPaths = [...paths, 'children', 'children'];

  useEffect(() => {
    /* eslint-disable react-hooks/exhaustive-deps */
    if (props.cols !== currentProps.cols) {
      updatePageSchema((draftSchema) => {
        const target = getTargetFromTree(draftSchema, colPaths);
        if (target) {
          const { current, key } = target;
          const span = Math.floor(24 / props.cols);
          for (let i = 0; i < props.cols; i++) {
            if (current[key][i]) {
              current[key][i].props.span = span;
            } else {
              current[key][i] = normalizeNodeScheme(getColNodeSchema({ span }));
            }
          }
        } else {
          console.warn('节点路径错误，无法更新目标节点', colPaths);
        }
      });
    }
    setCurrentProps({ ...props });
  }, [props]);

  return (
    <Row {...rowProps}>
      {[...Array(cols)].map((_, index) => {
        const node = colNodes[index];
        return (
          <Col key={node.key} {...node.props}>
            {renderSortable(node, [...colPaths, String(index)])}
          </Col>
        );
      })}
    </Row>
  );
};

Grid.__getInitialNodeSchema = (material, props) => {
  const { cols, ...rowProps } = props;
  const span = Math.floor(24 / (cols || 1));

  const row = getRowNodeSchema(rowProps);
  row.children = [getColNodeSchema({ span }), getColNodeSchema({ span })];

  return row;
};

Grid.__setFinalNodeSchema = (node) => {
  const { props, children } = node;
  const { cols } = props;
  const colNodes: NodeSchema[] = (children as any).children || [];

  (children as any).children = colNodes.slice(0, cols || 1);

  return node;
};

export default Grid;
