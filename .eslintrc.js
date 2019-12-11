module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['standard', 'prettier', 'prettier/standard', 'plugin:jest/recommended'],
  parser: 'babel-eslint',
  plugins: ['prettier'],
  rules: {
    'arrow-body-style': ['error', 'always'],
    'curly': ['error', 'multi-line'],
    'prettier/prettier': 'error',
    'sort-keys': ['error', 'asc', {
      caseSensitive: false,
      natural: true,
    }],
  },
}
