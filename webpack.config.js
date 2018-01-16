const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
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
		],
	},
	resolve: {
		extensions: ['.js', '.jsx'],
		modules: [PATH_CLIENT, 'node_modules'],
	},
	plugins: [
		new CleanWebpackPlugin([PATH_DIST]),
		new HtmlWebpackPlugin({ template: path.join(PATH_CLIENT, 'index.html') }),
	],
};
