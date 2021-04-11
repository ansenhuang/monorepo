import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
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

const PullBar = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
  cursor: col-resize;
`;
const Pull = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: -2px;
  z-index: 2;
  width: 4px;
  cursor: col-resize;
`;

const Grid: BuilderComponent = ({ schema, paths, updatePageSchema, renderSortable }) => {
  const [pullBarVisible, setPullBarVisible] = useState(false);

  const pullBarRef = useRef<HTMLDivElement>(null);

  const { props, children } = schema;
  const { cols, ...rowProps } = props;
  const colNodes = Array.isArray(children) ? children : [];
  const colPaths = [...paths, 'children'];

  const mouse = useMemo(
    () => ({
      index: -1,
      startX: 0,
      currentX: 0,
    }),
    [],
  );
  const updateSpan = (x: number) => {
    const width = pullBarRef.current?.clientWidth || 1000;
    const diffCurrentX = x - mouse.currentX;
    const sign = Math.sign(diffCurrentX);
    const span = Math.round(Math.abs((diffCurrentX / width) * 24));

    if (span > 0) {
      updatePageSchema((draftSchema) => {
        const currentPaths = [...colPaths, String(mouse.index)];
        const target = getTargetFromTree(draftSchema, currentPaths);
        if (target) {
          const { current, key } = target;
          const nextKey = mouse.index + 1;
          const realSpan = span * sign;
          if (current[key]) {
            const currentSpan = current[key].props.span || 1;
            const nextSpan = currentSpan + realSpan;
            if (nextSpan > 0 && nextSpan < 24) {
              current[key].props.span = nextSpan;
            }
          }
          if (current[nextKey]) {
            const currentSpan = current[nextKey].props.span || 1;
            const nextSpan = currentSpan - realSpan;
            if (nextSpan > 0 && nextSpan < 24) {
              current[nextKey].props.span = nextSpan;
            }
          }
        } else {
          console.warn('节点路径错误，无法更新目标节点', currentPaths);
        }
      });
      mouse.currentX += (span / 24) * width * sign;
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
    e.preventDefault();

    mouse.index = index;
    mouse.startX = e.clientX;
    mouse.currentX = e.clientX;

    setPullBarVisible(true);
  };
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    updateSpan(e.clientX);
  };
  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();

    if (mouse.startX === 0) {
      return;
    }

    updateSpan(e.clientX);
    setPullBarVisible(false);

    mouse.startX = 0;
  };

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
        return node?.visible ? (
          <Col key={node.key} {...node.props}>
            {renderSortable(node, [...colPaths, String(index)])}
            <Pull onMouseDown={(e) => handleMouseDown(e, index)} />
          </Col>
        ) : null;
      })}
      <PullBar
        ref={pullBarRef}
        style={{ zIndex: pullBarVisible ? 3 : -1 }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
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
