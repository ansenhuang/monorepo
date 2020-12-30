process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const babelPresetReactApp = require('babel-preset-react-app');
const { hasJsxRuntime } = require('./config/utils');

module.exports = function (api) {
  api.cache(true);

  const isBundledLib = Boolean(process.env.BUNDLED_TYPE);
  const useESModules = process.env.BUNDLED_TYPE === 'esm';
  const isEnvTest = process.env.NODE_ENV === 'test';

  const reactAppConfig = babelPresetReactApp(api, {
    useESModules: isBundledLib ? useESModules : true,
    runtime: hasJsxRuntime ? 'automatic' : 'classic',
    absoluteRuntime: false,
  });
  const basePresets = !isBundledLib ? reactAppConfig.presets : reactAppConfig.presets.slice(1);
  const basePlugins = reactAppConfig.plugins;
  const baseOverrides = reactAppConfig.overrides;

  return {
    presets: [
      isBundledLib && [
        '@babel/preset-env',
        {
          bugfixes: true,
          modules: useESModules ? false : 'commonjs',
          shippedProposals: false,
        },
      ],
      ...basePresets,
    ].filter(Boolean),
    plugins: [
      ...basePlugins,
      // 'babel-plugin-optimize-clsx',
      // '@babel/plugin-transform-react-constant-elements',
    ],
    overrides: [...baseOverrides],
    ignore: !isEnvTest
      ? [
          /@babel[\\|/]runtime/, // Fix a Windows issue.
          '**/*.test.js',
          '**/*.test.jsx',
          '**/*.test.ts',
          '**/*.test.tsx',
          '**/*.spec.ts',
          '**/*.spec.tsx',
          '**/__tests__/**/*',
          '**/*.d.ts',
        ]
      : [],
  };
};
