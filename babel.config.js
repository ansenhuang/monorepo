const path = require('path');

module.exports = function getBabelConfig(api) {
  const useESModules = api.env(['esm', 'rollup']);

  const presets = [
    [
      '@babel/preset-env',
      {
        bugfixes: true,
        debug: process.env.MUI_BUILD_VERBOSE === 'true',
        modules: useESModules ? false : 'commonjs',
        shippedProposals: false,
      },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ];

  const plugins = [
    [
      'babel-plugin-macros',
      {
        muiError: {
          errorCodesPath: path.join(__dirname, '.cache/error-codes.json'),
          missingError: process.env.MUI_EXTRACT_ERROR_CODES === 'true' ? 'write' : 'annotate',
        },
      },
    ],
    'babel-plugin-optimize-clsx',
    '@babel/plugin-transform-react-constant-elements',
    // Need the following 3 proposals for all targets in .browserslistrc.
    // With our usage the transpiled loose mode is equivalent to spec mode.
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-proposal-private-methods', { loose: true }],
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-syntax-dynamic-import',
    ['@babel/plugin-proposal-object-rest-spread', { loose: true }],
    [
      '@babel/plugin-transform-runtime',
      {
        useESModules,
        // any package needs to declare 7.4.4 as a runtime dependency. default is ^7.0.0
        version: '^7.4.4',
      },
    ],
  ];

  return {
    presets,
    plugins,
    ignore: [
      /@babel[\\|/]runtime/, // Fix a Windows issue.
      '**/*.test.js',
      '**/*.test.ts',
      '**/*.test.tsx',
      '**/*.spec.ts',
      '**/*.spec.tsx',
      '**/*.d.ts',
    ],
  };
};
