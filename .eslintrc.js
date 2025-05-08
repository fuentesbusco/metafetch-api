module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    'prettier/prettier': ['error'],
    '@typescript-eslint/no-unused-vars': ['warn'],
  },
};
