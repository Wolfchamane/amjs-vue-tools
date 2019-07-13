const { isDev } = require('../_common');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    test    : /\.css$/,
    use     : [
        {
            loader : isDev ? 'style-loader' : MiniCssExtractPlugin.loader
        },
        {
            loader  : 'css-loader',
            options : {
                sourceMap : isDev
            }
        }
    ]
};
