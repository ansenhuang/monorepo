import React from 'react';
import { Row, Col } from 'antd';
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
  const { props, children } = schema;
  const colNodes: NodeSchema[] = (children as any).children || [];
  const colPaths = [...paths, 'children', 'children'];

  return (
    <Row>
      {[...Array(props.cols || 1)].map((_, index) => {
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
  const span = 24 / (props.cols || 1);

  const row = getRowNodeSchema();
  row.children = [getColNodeSchema(span), getColNodeSchema(span)];

  return row;
};

export default Grid;
