/* eslint global-require : [0] */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = isPro => ({
    test    : /\.(sa|sc|c)ss$/,
    exclude : /node_modules\/(?!(?:@eurobits))/,
    use     : [
        {
            loader : isPro ? MiniCssExtractPlugin.loader : 'style-loader'
        },
        {
            loader  : 'css-loader',
            options : {
                sourceMap : !isPro
            }
        },
        {
            loader      : 'postcss-loader',
            options     : {
                plugins : [
                    require('postcss-import'),
                    require('postcss-url'),
                    require('autoprefixer')
                ]
            }
        },
        {
            loader  : 'sass-loader',
            options : {
                sourceMap       : !isPro,
                indentedSyntax  : true
            }
        }
    ]
});
