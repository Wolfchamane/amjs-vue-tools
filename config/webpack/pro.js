/* eslint global-require: [0] */
const merge = require('webpack-merge');
const paths = require('../paths');
const resolver  = require('../resolver');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
// http://vuejs.github.io/vue-loader/en/workflow/production.html
const config = require(resolver('config/index'));
const MAX_SIZE = 10000000;
const webpackConfig = merge(require(resolver('config/webpack/base')), {
    devtool : config.productionSourceMap ? config.devtool : false,
    output  : {
        path          : config.assetsRoot,
        filename      : paths.assets('js/[name].[chunkhash].js'),
        chunkFilename : paths.assets('js/[id].[chunkhash].js')
    },
    optimization    : {
        // Activa el hoisting del ámbito.
        concatenateModules  : true,
        // Minificadore de código
        minimizer           : [
            new TerserPlugin({
                sourceMap       : config.productionSourceMap,
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
    plugins : [
        require(resolver('config/webpack/define'))('pro'),
        // Extract css into its own file
        new MiniCssExtractPlugin({
            filename  : paths.assets('css/[name].[contenthash].css'),
            allChunks : true
        }),
        new OptimizeCSSPlugin({
            cssProcessorOptions : config.productionSourceMap
                ? {
                    safe : true,
                    map  : {
                        inline : false
                    }
                }
                : {
                    safe : true
                }
        }),
        new HtmlWebpackPlugin({
            filename : config.index,
            template : 'index.html',
            inject   : true,
            minify   : {
                removeComments        : true,
                collapseWhitespace    : true,
                removeAttributeQuotes : true
            },
            chunksSortMode : 'dependency'
        }),
        // Mantiene module.id estable cuando los módulos vendor no cambian
        new webpack.HashedModuleIdsPlugin(),
        require(resolver('config/webpack/copy'))
    ].filter(Boolean)
});
if (config.productionGzip)
{
    const CompressionWebpackPlugin = require('compression-webpack-plugin');
    webpackConfig.plugins.push(
        new CompressionWebpackPlugin({
            // asset     : '[path].gz[query]',
            algorithm : 'gzip',
            test      : new RegExp(`\\.(${config.productionGzipExtensions.join('|')})$'`),
            threshold : 10240,
            minRatio  : 0.8
        })
    );
}
if (config.bundleAnalyzerReport)
{
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
    webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}
module.exports = webpackConfig;
