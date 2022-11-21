/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const PrettierConfig = require('./.prettierrc.js');
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': ['warn', PrettierConfig], //同步规则
    '@typescript-eslint/no-non-null-assertion': 'off', //可以用!.
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'off', //空数组 为初始
    '@typescript-eslint/no-empty-interface': 'warn', //空类型
    '@typescript-eslint/explicit-module-boundary-types': 'off', //函数没有返回类型
    '@typescript-eslint/no-unused-vars': 'warn', //没用的变量
    'react/prop-types': 'off', //props 类型验证 过时
    '@typescript-eslint/no-empty-function': 'warn', //空函数
    '@typescript-eslint/no-explicit-any': 'off', //可以 any
  },
};
