const config = require('./base');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

config.devtool = 'cheap-module-eval-source-map';

config.devServer = {
    clientLogLevel     : 'warning',
    contentBase        : false,
    compress           : true,
    historyApiFallback : {
        rewrites : [
            {
                from : /.*/,
                to   : path.posix.join('/', 'index.html')
            }
        ]
    },
    hot     : true,
    host    : 'localhost',
    port    : 3000,
    open    : true,
    overlay : {
        warnings : false,
        errors   : true
    },
    publicPath   : '/',
    proxy        : {},
    quiet        : true, // Necesario para FriendlyErrorsPlugin
    watchOptions : {
        poll : true
    }
};

config.plugins = config.plugins.concat([
    new FriendlyErrorsWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
        filename : 'index.html',
        template : 'index.html',
        inject   : true
    })
]);

module.exports = config;
