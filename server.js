// Listen on a specific host via the HOST environment variable
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 8080;

function parseEnvList(env) {
  if (!env) return [];
  return env.split(',');
}

// Disable rate limiting and header requirements
const originBlacklist = parseEnvList(process.env.CORSANYWHERE_BLACKLIST);
const originWhitelist = parseEnvList(process.env.CORSANYWHERE_WHITELIST);

const cors_proxy = require('./lib/cors-anywhere');

cors_proxy.createServer({
  originBlacklist: originBlacklist,
  originWhitelist: [], // ✅ Allow all origins
  requireHeader: [],   // ✅ Allow requests without Origin/X-Requested-With (like preflight)
  checkRateLimit: null, // ✅ Disable rate limiting
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
}).listen(port, host, () => {
  console.log('🚀 CORS Anywhere running on ' + host + ':' + port);
});
