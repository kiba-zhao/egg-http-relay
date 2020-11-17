/**
 * @fileOverview http传递
 * @name relay.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const { isArray, get } = require('lodash');

/**
 * 传递请求
 * @param {Object} mappings 传递的http头数据映射
 * @param {Context} ctx 当前请求的上下文
 * @param {Object} headers httpClient请求头
 * @param {boolean} overwrite 是否允许覆盖传递的http头
 */
function relayRequest(mappings, ctx, { headers }, overwrite) {

  const keys = Object.keys(mappings);
  for (let key of keys) {
    if (headers.hasOwnProperty(key) && overwrite)
      continue;

    let value = get(ctx, mappings[key]);
    if (value !== undefined)
      headers[key] = value;
  }

}


/**
 * 拦截httpclient发起request请求
 * @param {Context} ctx 当前的上下文
 * @param {Object} arg 请求参数
 */
function onHttpClientRequestRelay({ ctx, args }) {

  if (ctx === undefined)
    return;

  const { config } = ctx.app;
  if (!isArray(config.httpRelay))
    return;

  args.headers = args.headers || {};
  for (let { match, mappings, overwrite } of config.httpRelay) {
    if (match && !match.test(args.url))
      continue;
    relayRequest(mappings, ctx, args, overwrite);
    break;
  }

}


module.exports = app => {

  app.httpclient.on('request', onHttpClientRequestRelay);

};
