// import { Mock } from './_utils';
// const api = require('../src/services/api');

// const { login } = api;

const wrapper = (data) => {
  return {
    success: true,
    code: 200,
    msg: '',
    value: data,
  };
};

const data = {
  // Priority processing.
  // apiMocker(app, path, option)
  // This is the option parameter setting for apiMocker
  // _proxy: {
  //   proxy: {
  //     '/repos/(.*)': 'https://api.github.com/',
  //     '/:owner/:repo/raw/:ref/(.*)': 'http://127.0.0.1:2018',
  //     '/api/repos/(.*)': 'http://172.16.0.132:8080'
  //   },
  //   // rewrite target's url path. Object-keys will be used as RegExp to match paths.
  //   // https://github.com/jaywcjlove/mocker-api/issues/62
  //   pathRewrite: {
  //     '^/api/repos/': '/repos/',
  //   },
  //   changeHost: true,
  //   // modify the http-proxy options
  //   httpProxy: {
  //     options: {
  //       ignorePath: true,
  //     },
  //     listeners: {
  //       // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //       proxyReq: function (proxyReq, req, res, options) {
  //         console.log('proxyReq');
  //       },
  //     },
  //   },    
  // },
  // =====================
  // The default GET request.
  // https://github.com/jaywcjlove/mocker-api/pull/63
  'GET /user/login': wrapper({
    id: 1,
    username: 'kenny',
    sex: 6
  }),
  'GET /api/:owner/:repo/raw/:ref/(.*)': (req, res) => {
    const { owner, repo, ref } = req.params;
    // http://localhost:8081/api/admin/webpack-mock-api/raw/master/add/ddd.md
    // owner => admin
    // repo => webpack-mock-api
    // ref => master
    // req.params[0] => add/ddd.md
    return res.json(wrapper({
      id: 1,
      owner, repo, ref,
      path: req.params[0]
    }));
  },
  'POST /api/login/account': (req, res) => {
    const { password, username } = req.body;
    if (password === '888888' && username === 'admin') {
      return res.json(wrapper({
        status: 'ok',
        code: 0,
        token: "sdfsdfsdfdsf",
        data: {
          id: 1,
          username: 'kenny',
          sex: 6
        }
      }));
    } else {
      return res.status(403).json({
        status: 'error',
        code: 403
      });
    }
  },
  'DELETE /api/user/:id': (req, res) => {
    console.log('---->', req.body)
    console.log('---->', req.params.id)
    res.send(wrapper({ status: 'ok', message: '删除成功！' }));
  }
};

module.exports = data;