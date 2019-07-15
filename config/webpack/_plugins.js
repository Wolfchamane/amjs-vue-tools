const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StylelintWebpackPlugin = require('stylelint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = (config, isDev) =>
{
    if (isDev)
    {
        config.plugins = [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NamedModulesPlugin(),
            new webpack.NoEmitOnErrorsPlugin(),
            /*new StylelintWebpackPlugin({
                configFile: path.resolve('.stylelintrc.yml'),
                context: path.resolve('src/css'),
                files: '**!/!*.css',
                failOnError: false,
                quiet: false,
            })*/
        ];
    }
    else
    {
        config.plugins = [
            new MiniCssExtractPlugin({
                filename      : '[name].css',
                chunkFilename : '[id].css'
            }),
            new webpack.HashedModuleIdsPlugin(),
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
            })
        ];
    }

    const htmlWebpackPluginConfig = {
        filename : isDev ? 'index.html' : path.resolve(config.destPath, 'index.html'),
        template : 'index.html',
        inject   : true
    };

    if (!isDev)
    {
        htmlWebpackPluginConfig.minify = {
            removeComments        : true,
            collapseWhitespace    : true,
            removeAttributeQuotes : true
        };
        htmlWebpackPluginConfig.chunksSortMode = 'dependency';
    }

    config.plugins.push(
        new HtmlWebpackPlugin(htmlWebpackPluginConfig)
    );

    if (config.productionGzip)
    {
        config.plugins.push(
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
        config.plugins.push(new BundleAnalyzerPlugin());
    }

    config.plugins.push(require('./plugin/copy'));
    config.plugins.push(new VueLoaderPlugin());
    /* config.plugins.push(
        require('./plugin/define')(process.env.NODE_ENV || 'dev'),
    );*/
};
