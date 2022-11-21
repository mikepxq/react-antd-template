/**
yarn add react
yarn add react-dom
yarn add react-router-dom

yarn add -D @types/react
yarn add -D    @types/react-dom
yarn add -D    @vitejs/plugin-react
yarn add -D    typescript
yarn add -D    vite
 */
/**
1.构建
  yarn create vite react-antd-template-next --template react-ts
  使用react18
2.统一环境
  1.eslint
    yarn add -D  eslint
     ./node_modules/.bin/eslint --init
    yarn add -D   eslint-plugin-react-hooks
  2.prettier
    yarn add -D prettier
    yarn add -D eslint-plugin-prettier
    yarn add -D eslint-config-prettier
  3.全局修复
    方案一
    npx mrm@2 lint-staged
    更新 husky
    yarn lint-fix
    方案二
    1.安装 npx husky-init & npm install
      "lint-staged": {
        "*.{js,tsx,ts}": "eslint --cache --fix"
      }
    2.修复 husky 无效
      去除pre-commit 执行下面，重新生成文件
      npx husky add .husky/pre-commit "npx lint-staged"
      npm i -D lint-staged@10
      lint
  4.更新依赖
    npm i -D typescript
    npm i react
    npm i -D @types/react
  5.配置构建
    1.别名
      yarn add -D @types/node
  6.css 预处理  scss
    yarn add -D scss
  7.mock
    1.yarn add  mockjs
      yarn add -D @types/mockjs
    2.yarn add -D vite-plugin-mock
3.项目结构
  1.typings  
  2.assets
  3.components
  4.styles
  5.views
  6.router
    //初始路由
    1.yarn add react-router-dom
  7.store
    yarn add @reduxjs/toolkit react-redux
    yarn add -D @types/react-redux
  8.apis
    1.yarn add axios
4.ui库 
  1.antd
    yarn add  antd
  2.yarn add nprogress
    yarn add -D @types/nprogress
5.其他
  1.svg icons
    https://github.com/vbenjs/vite-plugin-svg-icons/blob/main/README.zh_CN.md
    yarn add vite-plugin-svg-icons -D
  2.codemirror

    yarn add jsonlint
 */
