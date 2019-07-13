const path = require('path');
const { common } = require('../_common');

module.exports = {
    test    : /\.m?js$/,
    loader  : 'eslint-loader',
    enforce : 'pre',
    include : [
        common.srcPath,
        common.testPath
    ],
    exclude : /node_modules/,
    options : {
        formatter   : require('eslint-friendly-formatter'),
        emitWarning : true,
        useEslintrc : false
    }
};
