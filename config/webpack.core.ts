/**
 * webpack 基础配置
 */
import * as path from 'path';
import * as webpack from 'webpack';
import { CWD, BUILD, CWD_NODE_MODULES, NODE_MODULES, SOURCE_PATH, STATIC_PATH } from './path';

import * as  ExtractTextPlugin from 'extract-text-webpack-plugin';


const extractCSS = new ExtractTextPlugin('css/[name].css');

const ts = {
	compilerOptions: {
		module: 'es2015'
	}
};

export class WebpackConfig {
	cache?: boolean = true
	devtool = 'source-map'
	entry = {
		main: 'index.tsx',
		vendor: ['react', 'react-dom', 'three']
	}
	output = {
		path: BUILD,
		filename: '[name].js',
		sourceMapFilename: '[file].map',
		chunkFilename: '[id].chunk.js'
	}
	resolve = {
		extensions: ['.webpack.js', '.web.js', '.js', '.ts', '.tsx'],
		modules: [
			path.join(CWD, 'src/client'),
			CWD_NODE_MODULES,
			NODE_MODULES
		],
		alias: {
			'dat.gui':path.join(CWD_NODE_MODULES, 'dat.gui/build/dat.gui.js')
		}
	}
	module = {
		rules: [
			{
				test: /\.(tsx|ts)?$/,
				loader: 'babel-loader!ts-loader?' + JSON.stringify(ts)
			},
			{
				test: /\.jsx$/,
				loader: 'babel-loader'
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
				test: /\.less$/,
				loader: ExtractTextPlugin.extract({
					fallbackLoader: 'style-loader',
					loader: [
						{
							loader: 'css-loader',
							options: { sourceMap: true, importLoaders: 1 }
						},
						{
							loader: 'less-loader',
							options: { sourceMap: true }
						}
					]
				})
			},
			{
				test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'url-loader',
				query: {
					limit: 10000,
					mimetype: 'application/font-woff'
				}
			},
			{
				test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'url-loader',
				query: {
					limit: '10000',
					mimetype: 'application/octet-stream'
				}
			},
			{
				test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'url-loader'
			},
			{
				test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'url-loader',
				query: {
					limit: '10000',
					mimetype: 'application/svg+xml'
				}
			},
			{
				test: /\.(png|jpg|gif)$/,
				loader: 'url-loader',
				query: {
					limit: 8192,
					name: '[hash:8].[ext]'
				}
			},
			{
				test: /\.ico(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'url-loader'
			},
			{
				test: /\.(mp3|ogg|pack)$/,
				loader: 'file-loader',
				query: {
					name: '[hash:8].[ext]'
				}
			}
		]
	}
	plugins = [
		extractCSS,
		new webpack.optimize.CommonsChunkPlugin({
			names: ['vendor']
		})
	]
}
