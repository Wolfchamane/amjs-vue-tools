const path      = require('path');
const resolver  = require('../../utils/resolver');
const config    = resolver(path.join(__dirname, '..', '..', '..', '.eslintrc'))

module.exports = {
    test    : /\.(m?js|vue)$/,
    loader  : 'eslint-loader',
    enforce : 'pre',
    include : [
        path.resolve('src'),
        path.resolve('tests')
    ],
    options : {
        ...config,
        formatter   : require('eslint-friendly-formatter'),
        emitWarning : true,
        globals     : Object.keys(config.globals),
        useEslintrc : false
    }
};
