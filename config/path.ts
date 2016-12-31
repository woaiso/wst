/**
 * 提供基础目录服务
 */

// fix process not found
declare const process: {
	env: {
		NODE_ENV: string
	},
	cwd: any
};

declare const __dirname: string

//fix typescript end

import * as path from 'path';


export const CWD = process.cwd();
export const BUILD = path.join(CWD, 'dist/client');
export const DIST = path.join(CWD, 'dist');

export const CWD_NODE_MODULES = path.join(CWD, 'node_modules');
export const NODE_MODULES = path.join(__dirname, '../node_modules');

//客户端源代码路径
export const SOURCE_PATH = path.join(CWD, 'src/client');
export const STATIC_PATH = path.join(CWD, 'public');
