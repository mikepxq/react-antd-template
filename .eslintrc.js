/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const prettier = require("./.prettierrc.js");

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "prettier"],
  rules: {
    "prettier/prettier": ["error", prettier], //同步规则
    "@typescript-eslint/explicit-module-boundary-types": ["warn"], //同步规则到本地运行环境
  },
};
