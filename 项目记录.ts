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
  7.README.md
3.搭建项目结构
    1.typings  
    2.assets
    3.components
    4.styles
    5.views
    //需要依赖的 数据结构 store mock 连通mock数据
    6.routes
    7.store
    8.api
      1.mock    
4.antd layout 
 */

/**commitlint
build
ci
chore
docs
feat
fix
perf
refactor
revert
style
test
 */

/**参照
vite官网 ---------https://www.pipipi.net/vite/
concent官网 ------https://concentjs.github.io/concent-doc/
 */
