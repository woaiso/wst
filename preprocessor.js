// Copyright 2004-present Facebook. All Rights Reserved.

const tsc = require('typescript');
const babelJest = require('babel-jest');
const tsConfig = require('./tsconfig.json');

module.exports = {
	process(src, path) {
		if (/.*?\.(ts|tsx)$/i.test(path)) {
			tsConfig.compilerOptions.module = 'es2015';
			src = tsc.transpile(
				src,
				tsConfig.compilerOptions,
				path,
				[]
			);
		}
		if(/.*?\.(js|jsx|ts|tsx)$/i.test(path)){
			 src = babelJest.process(src, /.*?\.(js|jsx)$/i.test(path) ? path : 'file.js');
		}
		return src;
	},
};
