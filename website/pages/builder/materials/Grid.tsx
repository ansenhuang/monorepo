import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import { getTargetFromTree, normalizeNodeScheme } from '../helpers';
import type { BuilderComponent, CoreNodeSchema, NodeSchema } from '../types';

const getRowNodeSchema = (): CoreNodeSchema => {
  return {
    name: 'Row',
    label: '行',
    props: {},
    children: [],
  };
};
const getColNodeSchema = (span: number = 12): CoreNodeSchema => {
  return {
    name: 'Col',
    label: '列',
    props: {
      span,
    },
    children: [],
  };
};

const Grid: BuilderComponent = ({ schema, paths, updatePageSchema, renderSortable }) => {
  const [currentProps, setCurrentProps] = useState<Record<string, any>>({
    cols: 2,
  });

  const { props, children } = schema;
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
              current[key][i] = normalizeNodeScheme(getColNodeSchema(span));
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
    <Row>
      {[...Array(currentProps.cols)].map((_, index) => {
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
  const span = Math.floor(24 / (props.cols || 1));

  const row = getRowNodeSchema();
  row.children = [getColNodeSchema(span), getColNodeSchema(span)];

  return row;
};

Grid.__setFinalNodeSchema = (node) => {
  const { props, children } = node;
  const colNodes: NodeSchema[] = (children as any).children || [];

  (children as any).children = colNodes.slice(0, props.cols || 1);

  return node;
};

export default Grid;
