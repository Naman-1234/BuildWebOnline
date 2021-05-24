const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/users**',
    createProxyMiddleware({
      target: 'http://localhost:7000/',
      changeOrigin: true,
    })
  );
};
