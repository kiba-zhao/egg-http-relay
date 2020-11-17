/**
 * @fileOverview 功能测试
 * @name relay.test.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const mock = require('egg-mock');
const assert = require('power-assert');
const nock = require('nock');

describe('test/relay.test.js', () => {

  let app;
  before(() => {
    app = mock.app({
      baseDir: 'testapp',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);



  it('simple success', async () => {

    const headers = { 'App-ID': 'appId', 'Auth-ID': 'authId', 'Client-Name': 'clientName', 'Service-Name': app.name };
    const host = 'http://nock';
    const path = '/simple';

    let mocked = nock(host);
    for (let key in headers) {
      mocked = mocked.matchHeader(key, headers[key]);
    }
    mocked.get(path)
      .once()
      .reply(200, headers);

    const ctx = app.mockContext({ headers: { ...headers, 'Not-Relay': 'not relay this one' } });
    const res = await app.curl(`${host}${path}`, { dataType: 'json', ctx });

    assert.equal(res.status, 200);
    assert.deepStrictEqual(res.data, headers);
  });

});
