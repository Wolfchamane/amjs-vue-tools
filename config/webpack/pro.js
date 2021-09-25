const { merge }            = require('webpack-merge');
const { isPro, MAX_SIZE, assets, resolver }   = require('../utils');
const path                  = require('path');

module.exports = merge(
    require(resolver(path.join('config', 'webpack', 'base'))),
    {
        output : {
            chunkFilename   : isPro ? assets('js/[id].[chunkhash].js') : ''
        },
        optimization    : {
            concatenateModules  : true,
            minimizer           : [
                require(resolver(path.join('config', 'webpack', 'plugins', 'terser'))),
                require(resolver(path.join('config', 'webpack', 'plugins', 'optimize-css')))
            ]
        },
        performance : {
            maxEntrypointSize   : MAX_SIZE,
            maxAssetSize        : MAX_SIZE
        },
        plugins: [
            require(resolver(path.join('config', 'webpack', 'plugins', 'mini-css'))),
            require(resolver(path.join('config', 'webpack', 'plugins', 'html'))),
            require(resolver(path.join('config', 'webpack', 'plugins', 'hashed-module-id'))),
            require(resolver(path.join('config', 'webpack', 'plugins', 'bundle-analyzer')))
        ]
    }
);
