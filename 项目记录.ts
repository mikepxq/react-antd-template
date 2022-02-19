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
    npm i -D @typescript-eslint/parser
    npm i -D @typescript-eslint/eslint-plugin
    //
    
  2.提交检查 修复
    1.安装 npx husky-init & npm install
      "lint-staged": {
        "*.{js,tsx,ts}": "eslint --cache --fix"
      }
    2.修复 husky 无效
      去除pre-commit 执行下面，重新生成文件
      npx husky add .husky/pre-commit "npx lint-staged"
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
  5.分析大小
    npm i -D webpack-bundle-analyzer
  6.环境变量
    npm i -D cross-env
3.依赖 项目基础结构 routes store...
  1.routes 
    npm i react-router-dom @types/react-router-dom
    npm i react-router-dom
    npm i @types/react-router-dom
  2.栏加载
    npm i nprogress
    npm i -D @types/nprogress
  2.store
    npm install @reduxjs/toolkit react-redux
    npm i -D @types/react-redux
  3.apis
    npm i axios
4.ui库 antd
  1.antd
    npm i antd
  2.国际化
    1.import zhCN from 'antd/lib/locale/zh_CN';
  3.替换 moment
    npm i -D antd-dayjs-webpack-plugin
5.全局功能
  1.layout 侧边栏
  npm install --save @ant-design/icons
  2.登录 权限管理 路由404
6.具体功能
  1.markdown
    npm install --save @toast-ui/react-editor
  2. svg icons
    1.npm i @types/webpack-env @types/node -D
    2.craco.config.js 处理引用的svg
    npm i svg-sprite-loader -D
    3.退出重置store
    4.解析路由参数
    npm i query-string
 */
