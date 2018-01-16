const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATH_CLIENT = path.resolve(__dirname, 'client');
const PATH_DIST = path.resolve(__dirname, 'dist');

module.exports = {
	entry: path.join(PATH_CLIENT, 'index.js'),
	output: {
		filename: 'bundle.js',
		path: PATH_DIST,
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			},
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
	resolve: {
		extensions: ['.js', '.jsx'],
	},
	plugins: [
		new CleanWebpackPlugin([PATH_DIST]),
		new ExtractTextPlugin('style.scss'),
		new HtmlWebpackPlugin({ template: path.join(PATH_CLIENT, 'index.html') }),
	],
};
