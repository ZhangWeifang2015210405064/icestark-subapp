const { createProxyMiddleware } = require('http-proxy-middleware');

// 配置代理后端IP
module.exports = function(app) {
	app.use(createProxyMiddleware('/api', {
		target: 'server_ip',
		changeOrigin: true,
		pathRewrite: {
			'^/api': ''
		}
	}))
}
