module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-styled-components'],
  processors: [
    [
      'stylelint-processor-styled-components',
      {
        parserPlugins: [
          'jsx',
          'decorators-legacy',
          'classProperties',
          'exportExtensions',
          'functionBind',
          'functionSent',
        ],
      },
    ],
  ],
  rules: {
    'value-no-vendor-prefix': true,
    'property-no-vendor-prefix': true,
    'no-empty-source': null,
    'no-missing-end-of-source-newline': null,
    'declaration-colon-newline-after': null,
    'value-keyword-case': null,
  },
};
