# 文本净化

使用正则表达式清除文本中的无用字符串

version 1.0.0

## 启动项目

项目基于 `electron` 和 `angular`

运行 `npm run start` 同时并联启动 electron 和 angular. 要启动项目，必须更改 `/main.js` 中的 `loadFile` 为 `loadURL` 并指向 angular 调试地址 `http://localhost:4200/`，同时开启菜单栏使其可以刷新.

## 打包项目

运行 `npm run build` 打包 angular 项目，随后运行 `npm run electron-build` 打包 electron 项目.
