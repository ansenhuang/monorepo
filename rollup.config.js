const path = require('path');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const babel = require('rollup-plugin-babel');
const replace = require('@rollup/plugin-replace');
const nodeGlobals = require('rollup-plugin-node-globals');
const { terser } = require('rollup-plugin-terser');

const moduleName = '@huangancheng/' + path.basename(process.cwd());
const input = './src/index';
const globals = {
  'react': 'React',
  'react-dom': 'ReactDOM',
  'styled-components': 'StyledComponents',
};
const babelOptions = {
  exclude: /node_modules/,
  // We are using @babel/plugin-transform-runtime
  runtimeHelpers: true,
  extensions: ['.js', '.ts', '.tsx'],
  configFile: path.resolve(__dirname, './babel.config.js'),
};
const commonjsOptions = {
  ignoreGlobal: true,
  include: /node_modules/,
  namedExports: {
    '../../node_modules/prop-types/index.js': [
      'elementType',
      'bool',
      'func',
      'object',
      'oneOfType',
      'element',
    ],
    '../../node_modules/react/jsx-runtime.js': ['jsx', 'jsxs'],
    '../../node_modules/react-is/index.js': [
      'ForwardRef',
      'isFragment',
      'isLazy',
      'isMemo',
      'Memo',
      'isValidElementType',
      'typeOf',
      'isElement',
    ],
  },
};
const nodeOptions = {
  extensions: ['.js', '.tsx', '.ts'],
};

function onwarn(warning) {
  if (
    warning.code === 'UNUSED_EXTERNAL_IMPORT' &&
    warning.source === 'react' &&
    warning.names.filter((identifier) => identifier !== 'useDebugValue').length === 0
  ) {
    // only warn for
    // import * as React from 'react'
    // if (__DEV__) React.useDebugValue()
    // React.useDebug not fully dce'd from prod bundle
    // in the sense that it's still imported but unused. Downgrading
    // it to a warning as a reminder to fix at some point
    console.warn(warning.message);
  } else {
    throw Error(warning.message);
  }
}

module.exports = {
  input,
  onwarn,
  output: {
    file: './lib/umd/index.js',
    format: 'umd',
    name: moduleName,
    exports: 'named',
    globals,
  },
  external: Object.keys(globals),
  plugins: [
    nodeResolve(nodeOptions),
    babel(babelOptions),
    commonjs(commonjsOptions),
    nodeGlobals(), // Wait for https://github.com/cssinjs/jss/pull/893
    replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
    terser(),
  ],
};
