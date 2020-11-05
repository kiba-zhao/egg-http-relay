# egg-http-relay #
基于[eggjs](https://eggjs.org/zh-cn/index.html)的http消息头传递插件。

## 安装 ##
```bash
npm install git+ssh://git@github.com:kiba-zhao/egg-http-relay.git --save
```

## 启用 ##
设置启用plugin: `config/plugin.js`
```javascript
exports.httpRelay = {
  enable:true,
  package:'egg-http-relay'
};
```

## 配置 (可选) ##
配置过滤规则: `config/config.default.js`
```javascript
const headers = ["headers"];

exports.httpRelay = {
  mappings: {
    "App-ID": [...headers, "App-ID".toLowerCase()],
    "Auth-ID": [...headers, "Auth-ID".toLowerCase()],
    "Client-Name": [...headers, "Client-Name".toLowerCase()],
    "Service-Name": ["app", "name"]
  }
};
```

## 使用 ##

```bash
npm i
npm run dev
```
