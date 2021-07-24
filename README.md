# install
进入项目
npm install
# 启动
npm run dev
# 修复
npm run lint:fix
# 打包
npm run build

# layout
```
html--------------------
  body------------------
    app-----------------
      page--------------
        content---------

```
## 数据流
> 请记住互联网是层的概念
```
get---------页面获取数据
fetch-------store 全局缓存获取数据
req---------接口请求数据

例如：
getUserInfo()
fetchUserInfo()
reqUserInfo()
```
> 不同层有不同的前缀，这样一下就能知道调用的函数是那里的