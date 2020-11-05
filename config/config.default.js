/**
 * @fileOverview 默认配置文件
 * @name config.default.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

module.exports = app => {

  const exports = {};
  const headers = ["headers"];

  exports.httpRelay = [
    {
      mappings: {
        "App-ID": [...headers, "App-ID".toLowerCase()],
        "Auth-ID": [...headers, "Auth-ID".toLowerCase()],
        "Client-Name": [...headers, "Client-Name".toLowerCase()],
        "Service-Name": ["app", "name"]
      }
    }
  ];

  return exports;

};
