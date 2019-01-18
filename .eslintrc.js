module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ['standard', 'prettier', 'prettier/standard', 'plugin:jest/recommended'],
  parser: 'babel-eslint',
  plugins: ['prettier'],
  rules: { 'prettier/prettier': 'error' },
}
