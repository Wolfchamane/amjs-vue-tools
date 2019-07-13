const base = require('./_base');
const { common } = require('./_common');
const TerserPlugin = require('terser-webpack-plugin');

const MAX_SIZE = 10000000;

const config = Object.assign(base, {
    devtool : common.productionSourceMap ? common.devtool : false,
    output  : {
        path          : common.assetsRoot,
        filename      : common.assets('js/[name].[chunkhash].js'),
        chunkFilename : common.assets('js/[id].[chunkhash].js')
    },
    optimization    : {
        // Activa el hoisting del ámbito.
        concatenateModules  : true,
        // Minificadore de código
        minimizer           : [
            new TerserPlugin({
                sourceMap       : common.productionSourceMap,
                parallel        : true,
                extractComments : {
                    banner      : false
                }
            })
        ]
    },
    performance : {
        maxEntrypointSize   : MAX_SIZE,
        maxAssetSize        : MAX_SIZE
    },
    plugins : common.plugins,
    stats: 'minimal',
    bail: true
});


module.exports = config;
