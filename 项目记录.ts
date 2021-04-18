/**
1.基础构建
  1.npm init @vitejs/app my-vue-app --template react-ts
2.统一环境
  1.npm i -D eslint
    ./node_modules/.bin/eslint --init
  2.npm i -D  prettier
    npm i -D eslint-plugin-prettier  使用eslint使用prettier
    npm i -D eslint-config-prettier
  3.git 格式化 提交校验
    npm i -D husky@=4
    npm i -D lint-staged
    package.json 配置
  4.commitlint
    npm i -D @commitlint/config-conventional @commitlint/cli
    package.json
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"    提交前检查 commit 标题
    commitlint.config.js
  5.别名
    vite.config.ts
  6.less
    npm i -D less
3.搭建项目结构
  1. 
4. 数据结构 store mock 连通mock数据
5.antd layout 
 */

/**参照
vite官网--------- https://www.pipipi.net/vite/
 */
