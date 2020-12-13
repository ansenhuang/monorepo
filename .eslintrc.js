module.exports = {
  root: true, // So parent files don't get applied
  globals: {
    preval: false, // Used in the documentation
  },
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  extends: ['plugin:import/recommended', 'plugin:import/typescript'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 7,
  },
  plugins: ['eslint-plugin-react', 'eslint-plugin-react-hooks', '@typescript-eslint/eslint-plugin'],
  settings: {
    react: {
      version: 'detect',
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
  },
  rules: {
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'styled-components',
            message: 'Please import from styled-components/macro.',
          },
        ],
        patterns: ['!styled-components/macro'],
      },
    ],
  },
};
