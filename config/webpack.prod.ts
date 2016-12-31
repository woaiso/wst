/**
 * 线上和测试运行环境的Webpack配置
 * @version 1.0.1
 * @author woaiso@woaiso.com
 * @github woaiso.github.com
 */
import * as path from 'path';
import * as webpack from 'webpack';
import { HotModuleReplacementPlugin, NoErrorsPlugin } from 'webpack';
import { WebpackConfig } from './webpack.core';
import * as merge from 'webpack-merge';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';



import { CWD, SOURCE_PATH, STATIC_PATH } from './path';

class WebpackProd {
    /**
     * webpack插件
     *
     * @memberOf WebpackDev
     */
	plugins = [
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': '"production"'
			}
		}),
		//https://github.com/ampedandwired/html-webpack-plugin
		new HtmlWebpackPlugin({
			title: 'wst',
			filename: 'index.html',
			template: path.join(SOURCE_PATH, 'index.ejs'),
			inject: 'body',
			favicon: path.join(STATIC_PATH, 'icon.png'),
			minify: {}, //https://github.com/kangax/html-minifier#options-quick-reference
			hash: true, //if true then append a unique webpack compilation hash to all included scripts and CSS files. This is useful for cache busting.
			cache: true, //true (default) try to emit the file only if it was changed.
			showErrors: true, // if true (default) errors details will be written into the HTML page.
			chunks: ['main'],
			chunksSortMode: 'auto', // Allows to control how chunks should be sorted before they are included to the html. Allowed values: 'none' | 'auto' | 'dependency' | {function} - default: 'auto'
			excludeChunks: ['unit-test'],
			xhtml: false, //If true render the link tags as self-closing, XHTML compliant. Default is false,
			environment: 'prod'
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		})
	]
	//https://webpack.js.org/configuration/stats/
	stats = {
		assets: true,
		chunks: false,
		chunkModules: false,
		children: false,
		modules: false
	};
}
//核心配置
const coreConfig = new WebpackConfig();
//线上和测试运行环境的Webpack配置
const prodConfig = new WebpackProd();
const config = merge(coreConfig, prodConfig);
export default config;
