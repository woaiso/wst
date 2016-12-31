// Copyright 2004-present Facebook. All Rights Reserved.

const tsc = require('typescript');
const tsConfig = require('./tsconfig.json');

module.exports = {
  process(src, path) {
    if (/.*?\.(ts|tsx)$/.test(path)) {
      return tsc.transpile(
        src,
        tsConfig.compilerOptions,
        path,
        []
      );
    }
    return src;
  },
};
