const hasJsxRuntime = (() => {
  if (process.env.DISABLE_NEW_JSX_TRANSFORM === 'true') {
    return false;
  }

  try {
    require.resolve('react/jsx-runtime');
    return true;
  } catch (e) {
    return false;
  }
})();

module.exports = {
  extends: ['react-app'],
  rules: {
    'react/react-in-jsx-scope': !hasJsxRuntime ? 'error' : 'off',
  },
};
