const { merge }                                         = require('webpack-merge');
const { port, host, withProxy, assetsPublicPath, resolver }        = require('../utils');
const path                                              = require('path');
const portFinder                                        = require('./port-finder');

const proxySettings = withProxy
    ? resolver(path.join('config', 'proxy'))
    : {};

module.exports = portFinder(merge(
    require(resolver(path.join('config', 'webpack', 'base'))),
    {
        devServer           : {
            host,
            port,
            clientLogLevel  : 'warning',
            hot             : true,
            contentBase     : false,
            compress        : true,
            historyApiFallback : {
                rewrites : [
                    {
                        from : /.*/,
                        to   : path.posix.join(assetsPublicPath, 'index.html')
                    }
                ]
            },
            open            : false,
            overlay         : {
                warnings    : false,
                errors      : true
            },
            publicPath      : assetsPublicPath,
            quiet           : false,
            watchOptions    : {
                poll        : false
            },
            ...proxySettings
        },
        plugins             : [
            require(resolver(path.join('config', 'webpack', 'plugins', 'eslint'))),
            require(resolver(path.join('config', 'webpack', 'plugins', 'stylelint'))),
            require(resolver(path.join('config', 'webpack', 'plugins', 'hmr'))),
            require(resolver(path.join('config', 'webpack', 'plugins', 'no-emit-on-errors'))),
            require(resolver(path.join('config', 'webpack', 'plugins', 'friendly-errors')))
        ]
    }
), port);
