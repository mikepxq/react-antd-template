/**
1.构建
  npx create-react-app m-web-console --template typescript
2.统一构建环境
  1.
    npm i -D eslint prettier eslint-plugin-prettier eslint-config-prettier
    npm i -D eslint
      ./node_modules/.bin/eslint --init
      "lint:fix": "eslint --fix --ext  .ts,tsx,js,d.ts,less,scss src"
    npm i -D prettier
    npm i -D eslint-plugin-prettier
    npm i -D eslint-config-prettier
    //
    
  2.提交检查 修复
    npx husky-init && npm install
      "lint-staged": {
        "*.{js,tsx,ts}": "eslint --cache --fix"
      }
    npm i -D lint-staged@10
    lint
  3.更新依赖
    npm i -D typescript
    npm i react
    npm i -D @types/react
  
  4.配置构建 craco
    1.
      npm install @craco/craco -D
      npm i -D craco-less
    2.别名路径
      @
    3.mock
      有两种方式 编译器 运行时
        编译器 重启更新 影响热更新
        运行时 实时更新 影响构建数据 需要配置模式
      npm i -D mockjs
      npm i --save-dev @types/mockjs
    4.环境变量

3.依赖 项目基础结构 routes store...
  1.routes
    npm i react-router-dom @types/react-router-dom
    npm i react-router-dom
    npm i @types/react-router-dom
  2.store
    npm install @reduxjs/toolkit react-redux
    npm i -D @types/react-redux
  3.apis
    npm i axios
4.ui库 antd 
5.基础功能
  1.登录 权限管理 路由404 侧边栏
 */
