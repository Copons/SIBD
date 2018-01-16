const merge = require('webpack-merge');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const config = require('./webpack.config');
const PATH_API = require('./api.config');

module.exports = merge(config, {
	devtool: 'source-map',
	plugins: [
		new UglifyJSPlugin({ sourceMap: true }),
		new webpack.DefinePlugin({
			API: JSON.stringify(PATH_API.PROD),
			'process.env.NODE_ENV': JSON.stringify('production'),
		}),
	],
});
