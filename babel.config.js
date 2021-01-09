process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const { hasJsxRuntime } = require('./config/utils');

module.exports = function (api) {
  api.cache(true);

  const isEnvTest = process.env.NODE_ENV === 'test';
  const isEnvProduction = process.env.NODE_ENV === 'production';
  const isEnvDevelopment = process.env.NODE_ENV === 'development';

  const isBundledLib = Boolean(process.env.BUNDLED_TYPE);
  const useESModules = isBundledLib ? process.env.BUNDLED_TYPE === 'esm' : true;
  const runtime = hasJsxRuntime ? 'automatic' : 'classic';

  return {
    presets: [
      isEnvTest && [
        // ES features necessary for user's Node version
        '@babel/preset-env',
        {
          targets: {
            node: 'current',
          },
        },
      ],
      (isEnvProduction || isEnvDevelopment) && [
        // Latest stable ECMAScript features
        '@babel/preset-env',
        {
          bugfixes: true,
          shippedProposals: false,
          modules: useESModules ? false : 'commonjs',
          // Allow importing core-js in entrypoint and use browserlist to select polyfills
          useBuiltIns: 'entry',
          // Set the corejs version we are using to avoid warnings in console
          corejs: 3,
          // Exclude transforms that make all code slower
          exclude: ['transform-typeof-symbol'],
        },
      ],
      [
        '@babel/preset-react',
        {
          // Adds component stack to warning messages
          // Adds __self attribute to JSX which React will use for some warnings
          development: isEnvDevelopment || isEnvTest,
          // Will use the native built-in instead of trying to polyfill
          // behavior for any plugins that require one.
          ...(runtime !== 'automatic' ? { useBuiltIns: true } : {}),
          runtime: runtime || 'classic',
        },
      ],
      '@babel/preset-typescript',
    ].filter(Boolean),
    plugins: [
      // Experimental macros support. Will be documented after it's had some time
      // in the wild.
      'babel-plugin-macros',
      'babel-plugin-transform-typescript-metadata',
      // Turn on legacy decorators for TypeScript files
      [
        '@babel/plugin-proposal-decorators',
        {
          legacy: true,
        },
      ],
      // class { handleClick = () => { } }
      // Enable loose mode to use assignment instead of defineProperty
      // See discussion in https://github.com/facebook/create-react-app/issues/4263
      [
        '@babel/plugin-proposal-class-properties',
        {
          loose: true,
        },
      ],
      // Adds Numeric Separators
      '@babel/plugin-proposal-numeric-separator',
      // Polyfills the runtime needed for async/await, generators, and friends
      // https://babeljs.io/docs/en/babel-plugin-transform-runtime
      [
        '@babel/plugin-transform-runtime',
        {
          corejs: false,
          helpers: true,
          // By default, babel assumes babel/runtime version 7.0.0-beta.0,
          // explicitly resolving to match the provided helper functions.
          // https://github.com/babel/babel/issues/10261
          version: require('@babel/runtime/package.json').version,
          regenerator: true,
          // https://babeljs.io/docs/en/babel-plugin-transform-runtime#useesmodules
          // We should turn this on once the lowest version of Node LTS
          // supports ES Modules.
          useESModules,
        },
      ],
      isEnvProduction && [
        // Remove PropTypes from production build
        'babel-plugin-transform-react-remove-prop-types',
        {
          removeImport: true,
        },
      ],
      // Optional chaining and nullish coalescing are supported in @babel/preset-env,
      // but not yet supported in webpack due to support missing from acorn.
      // These can be removed once webpack has support.
      // See https://github.com/facebook/create-react-app/issues/8445#issuecomment-588512250
      '@babel/plugin-proposal-optional-chaining',
      '@babel/plugin-proposal-nullish-coalescing-operator',
    ].filter(Boolean),
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
