const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATH_CLIENT = path.resolve(__dirname, 'client');
const PATH_DIST = path.resolve(__dirname, 'dist');

module.exports = {
	entry: path.join(PATH_CLIENT, 'index.js'),
	devtool: 'inline-source-map',
	devServer: {
		contentBase: PATH_DIST,
		hot: true,
	},
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
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
		],
	},
	resolve: {
		extensions: ['.js', '.jsx'],
	},
	plugins: [
		new CleanWebpackPlugin([PATH_DIST]),
		new HtmlWebpackPlugin({ template: path.join(PATH_CLIENT, 'index.html') }),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
	],
};
