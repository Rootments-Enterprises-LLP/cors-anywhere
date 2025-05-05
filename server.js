const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 8080;

const cors_proxy = require('./lib/cors-anywhere');

cors_proxy.createServer({
  originWhitelist: [],          // ✅ Allow all origins
  requireHeader: [],            // ✅ Allow requests without special headers
  checkRateLimit: null,         // ✅ Disable rate limiting
  removeHeaders: [
    'cookie',
    'cookie2',
    'x-request-start',
    'x-request-id',
    'via',
    'connect-time',
    'total-route-time',
  ],
  redirectSameOrigin: true,
  httpProxyOptions: {
    xfwd: false,
  },
}).listen(port, host, function () {
  console.log('✅ CORS Anywhere running on ' + host + ':' + port);
});
