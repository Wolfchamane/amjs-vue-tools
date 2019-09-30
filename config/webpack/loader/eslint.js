/* eslint global-require: [0] */
const merge = require('../../merge');
const path = require('path');
const config = merge.file({}, '.eslintrc.yml', 'yaml');
module.exports = {
    test    : /\.(m?js|vue)$/,
    loader  : 'eslint-loader',
    enforce : 'pre',
    include : [path.resolve('src'), path.resolve('tests')],
    options : {
        ...config,
        formatter   : require('eslint-friendly-formatter'),
        emitWarning : true,
        globals     : Object.keys(config.globals),
        useEslintrc : false
    }
};
