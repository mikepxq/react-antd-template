# 简介

> react-admin-template 是一个初始的管理后台，始于[create-react-app](https://zh-hans.reactjs.org/docs/create-a-new-react-app.html)+[craco](https://github.com/gsoft-inc/craco),基于 react+react-router+react-redux+antd+axios,包含统一规范的开发环境，异步动态的权限管理。

# 开始

```bash
# 克隆项目
https://github.com/mikepxq/react-antd-template.git

# 进入项目目录
cd react-admin-template

# 安装依赖
npm install

#启动本地开发
npm run dev
```

浏览器访问 http://localhost:3000

# 发布

```bash
# 构建生产环境
npm run build
```

# 其他

```bash
# 全局代码格式化
npm run link:fix
```

# 技术选型说明

## create-react-app+craco VS vite+react-ts

> 明知道 cra 慢的心疼，那为什么不用 vite 呢，这主要考虑长期的稳定性。既然是 react 生态，那最好尽量使用官方推荐的方案。

> 不过好消息是，现在能在 react 相关生态看见 vite 的声影。这里我也会持续关注 react 官方，当使用 vite 构建的时候，我会尽快跟进。

## less

> 为什么使用 less？因为 antd 使用的 less。同步 ui 在动态主题时，可以使用全局变量。

## layout

> 全局视图层结构

```
html--------------------
  body------------------
    app-----------------
      page--------------
        content---------

```

## 数据流

```
get---------页面获取数据
fetch-------store 全局缓存获取数据
req---------接口请求数据

例如：
getUserInfo()
fetchUserInfo()
reqUserInfo()
```

> 不同层有不同的前缀，这样更美观的同时，也能更快的定位是那里的调用。

## 浏览器的支持

> 虽然 cra 兼容 ie10+,但此项目暂不做 ie 的支持

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br> Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| last 2 versions                                                                                                                                                                                             | last 2 versions                                                                                                                                                                                                   | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                               |

## License

[MIT](https://github.com/mikepxq/react-antd-template/blob/dev/LICENSE) license.

Copyright (c) 2021-present mikepxq
