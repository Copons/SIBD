const merge = require('webpack-merge');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const config = require('./webpack.config');
const PATH_API = require('./api.config');

module.exports = merge(config, {
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.(css|scss)$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
							options: { minimize: true, sourceMap: true },
						},
						{
							loader: 'sass-loader',
							options: { sourceMap: true },
						},
					],
				}),
			},
		],
	},
	plugins: [
		new ExtractTextPlugin('style.css'),
		new UglifyJSPlugin({ sourceMap: true }),
		new webpack.DefinePlugin({
			API: JSON.stringify(PATH_API.PROD),
			'process.env.NODE_ENV': JSON.stringify('production'),
		}),
	],
});
