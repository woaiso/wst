/**
 * webpack 基础配置
 */
import * as path from 'path';
import { CWD, BUILD, CWD_NODE_MODULES, NODE_MODULES, SOURCE_PATH, STATIC_PATH } from './path';

import * as  ExtractTextPlugin from 'extract-text-webpack-plugin';


const extractCSS = new ExtractTextPlugin('css/[name].css');

export class WebpackConfig {
	cache?: boolean = true
	devtool = 'source-map'
	entry = {
		main: 'index.tsx'
	}
	output = {
		path: BUILD,
		filename: '[name].bundle.js',
		sourceMapFilename: '[file].map',
		chunkFilename: '[id].chunk.js'
	}
	resolve = {
		extensions: ['.webpack.js', '.web.js', '.js', '.ts', '.tsx'],
		modules: [
			path.join(CWD, 'src/client'),
			CWD_NODE_MODULES,
			NODE_MODULES
		]
	}
	externals = {
		'react': 'React',
		'react-dom': 'ReactDOM'
	}
	module = {
		rules: [
			{
				test: /\.(tsx|ts)?$/,
				loader: 'babel-loader!ts-loader'
			},
			{
				test: /\.js$/,
				loader: 'source-map-loader'
			},
			{
				test: /\.css$/,
				loader: extractCSS.extract({
					fallbackLoader: 'style-loader',
					loader: ['css-loader?importLoaders=1&sourceMap', 'postcss-loader']
				})
			},
			{
				test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'url',
				query: {
					limit: 10000,
					mimetype: 'application/font-woff'
				}
			},
			{
				test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'url',
				query: {
					limit: '10000',
					mimetype: 'application/octet-stream'
				}
			},
			{
				test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'file'
			},
			{
				test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'url',
				query: {
					limit: '10000',
					mimetype: 'application/svg+xml'
				}
			},
			{
				test: /\.(png|jpg)$/,
				loader: 'url',
				query: {
					limit: 8192
				}
			},
			{
				test: /\.ico(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'url'
			}
		]
	}
	plugins = [
		extractCSS
	]
}
