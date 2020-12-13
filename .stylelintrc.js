module.exports = {
  extends: ['stylelint-config-standard'],
  processors: ['stylelint-processor-styled-components'],
  rules: {
    'value-no-vendor-prefix': true,
    'property-no-vendor-prefix': true,
    'no-empty-source': null,
    'no-missing-end-of-source-newline': null,
    'declaration-colon-newline-after': null,
    'value-keyword-case': null,
  },
};
