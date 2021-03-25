/* config-overrides.js */
const path = require('path');
const { override, addWebpackExternals, addWebpackAlias, overrideDevServer, adjustStyleLoaders } = require('customize-cra');

const allowCORS = () => config => {
	// Default config: https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/config/webpackDevServer.config.js
	config.headers = { 'Access-Control-Allow-Origin': '*' };
	return config
}

module.exports = {
	webpack: override(
		// addWebpackExternals({
		// 	React: 'React'
		// }),
		addWebpackAlias({
			'@': path.resolve(__dirname, 'src')
		}),
		adjustStyleLoaders(rule => {
			if (rule.test.toString().includes('scss')) {
				rule.use.push({
					loader: require.resolve('sass-resources-loader'),
					options: {
						resources: [
							'./src/styles/_mixin.scss',
							'./src/styles/_vars.scss'
						]
					}
				})
			}
		}),
	),
	devServer: overrideDevServer(
		allowCORS()
	)
}
