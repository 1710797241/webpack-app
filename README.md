# 多入口配置

[tag 地址](https://github.com/1710797241/webpack-app/tree/multi-entry)

## 注意点

1.  每个模块需要单独实例化，而不是仅实例化一次

    `webapck.conig.js optimization: { runtimeChunk: 'single', }, `
