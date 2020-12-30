const { hasJsxRuntime } = require('./config/utils');

module.exports = {
  extends: ['react-app', 'react-app/jest'],
  rules: {
    strict: 'off',
    'react/react-in-jsx-scope': !hasJsxRuntime ? 'error' : 'off',
  },
};
