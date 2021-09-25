const { isPro }         = require('../../utils/env');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path              = require('path');

module.exports = (options = {}) => new HtmlWebpackPlugin({
    filename    : isPro ? path.resolve('dist', 'index.html') : 'index.html',
    template    : path.resolve('index.html'),
    inject      : true,
    minify      : isPro
        ? {
            removeComments        : true,
            collapseWhitespace    : true,
            removeAttributeQuotes : true
        } : false,
    ...options
});
