const { common, isDev } = require('../_common');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    test    : /\.(sa|sc|c)ss$/,
    exclude : /node_modules/,
    use     : [
        {
            loader : isDev ? 'style-loader' : MiniCssExtractPlugin.loader
        },
        {
            loader  : 'css-loader',
            options : {
                sourceMap : isDev
            }
        },
        {
            loader      : 'postcss-loader',
            options     : {
                plugins : [
                    require('postcss-assets')({
                        loadPaths : [
                            path.resolve(common.assetsRoot, 'img')
                        ]
                    }),
                    require('postcss-import'),
                    require('postcss-url'),
                    require('autoprefixer')
                ]
            }
        },
        {
            loader  : 'sass-loader',
            options : {
                sourceMap       : isDev,
                indentedSyntax  : true
            }
        }
    ]
};
