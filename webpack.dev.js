const merge = require('webpack-merge');
const webpack = require('webpack');
const config = require('./webpack.config');
const PATH_API = require('./api.config');

module.exports = merge(config, {
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './dist',
		hot: true,
	},
	module: {
		rules: [
			{
				test: /\.(css|scss)$/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
		],
	},
	plugins: [
		new webpack.DefinePlugin({ API: JSON.stringify(PATH_API.DEV) }),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
	],
});
