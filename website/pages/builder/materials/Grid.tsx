import React from 'react';
import { Row, Col } from 'antd';
import type { BuilderComponentProps } from '../types';

const Grid: React.FC<BuilderComponentProps> = ({
  schema,
  paths,
  updatePageSchema,
  renderSortable,
}) => {
  const { props, children } = schema;
  const rowChildren = children?.[0].children || [];
  const colPaths = [...paths, 'children', '0', 'children'];

  return (
    <Row>
      {[...Array(props.cols || 1)].map((_, index) => {
        const node = rowChildren[index];
        return (
          <Col key={node.key} {...node.props}>
            {renderSortable(node, [...colPaths, String(index)])}
          </Col>
        );
      })}
    </Row>
  );
};

export default Grid;
