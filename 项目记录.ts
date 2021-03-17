/**
1.基础构建
  1.npx create-react-app react-antd-template --template typescript
  2.npm install @craco/craco -D
2.统一环境
  1.npm i -D eslint
    ./node_modules/.bin/eslint --init
  2.npm i -D --save-exact  prettier
    npm i -D eslint-plugin-prettier  使用eslint使用prettier
    npm i -D eslint-config-prettier  解决冲突
  3.npx mrm lint-staged  //将下载 husky and lint-staged 并添加配置 提交全局格式化
  4.commitlint
    npm i -D @commitlint/config-conventional @commitlint/cli
    "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"    提交前检查 commit 标题

3.视图结构 路由 style 
4. 数据结构 store mock 连通mock数据
5.antd layout 
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
/**
参照：
https://github.com/gsoft-inc/craco/blob/master/packages/craco/README.md#installation
https://cn.eslint.org/docs/user-guide/getting-started
https://prettier.io/docs/en/install.html
https://prettier.io/docs/en/options.html
https://www.npmjs.com/package/eslint-plugin-prettier
 */
