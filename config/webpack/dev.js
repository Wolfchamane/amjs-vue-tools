const { common } = require('./_common');
const base = require('./_base');
const path = require('path');
const portFinder = require('./_port-finder');
const net = require('node-env-tools');

const config = Object.assign(base, {
    devtool   : common.devtool,
    devServer : {
        clientLogLevel     : 'warning',
        contentBase        : false,
        compress           : true,
        historyApiFallback : {
            rewrites : [
                {
                    from : /.*/,
                    to   : path.posix.join(common.assetsPublicPath, 'index.html')
                }
            ]
        },
        hot     : true,
        host    : net.get('HOST') || common.host,
        port    : net.get('PORT') || common.port,
        open    : true,
        overlay : {
            warnings : false,
            errors   : true
        },
        publicPath   : common.assetsPublicPath,
        proxy        : common.proxyTable,
        quiet        : true, // Necesario para FriendlyErrorsPlugin
        watchOptions : {
            poll : common.poll
        }
    },
    plugins : common.plugins
});

module.exports = portFinder(config, common.port);
