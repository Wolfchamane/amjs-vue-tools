/* eslint global-require: [0] */
const merge = require('webpack-merge');
const net = require('node-env-tools');
const path = require('path');
const portFinder = require('../port-finder');
const resolver = require('../resolver');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//
const config = require(resolver('config/index'));
//
const webpackConfig = merge(require(resolver('config/webpack/base')), {
    // Cheap-module-eval-source-map es más rápido para desarrollo
    devtool   : config.devtool,
    devServer : {
        clientLogLevel     : 'warning',
        contentBase        : false,
        compress           : true,
        historyApiFallback : {
            rewrites : [
                {
                    from : /.*/,
                    to   : path.posix.join(config.assetsPublicPath, 'index.html')
                }
            ]
        },
        hot     : true,
        host    : net.get('HOST') || config.host,
        port    : net.get('PORT') || config.port,
        open    : config.autoOpenBrowser,
        overlay : {
            warnings : false,
            errors   : true
        },
        publicPath   : config.assetsPublicPath,
        proxy        : config.proxyTable,
        quiet        : true, // Necesario para FriendlyErrorsPlugin
        watchOptions : {
            poll : config.poll
        }
    },
    plugins : [
        require(resolver('config/webpack/define'))(process.env.NODE_ENV || 'dev'),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            filename : 'index.html',
            template : 'index.html',
            inject   : true
        }),
        require(resolver('config/webpack/copy'))
    ].filter(Boolean)
});

module.exports = portFinder(webpackConfig, config.port);
