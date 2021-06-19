const createProxyMiddleware = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    //This means all the requests originating from /users will be directed to backend.
    '/users**',
    createProxyMiddleware({
      target: 'http://localhost:3001/',
      changeOrigin: true,
    })
  );
};
