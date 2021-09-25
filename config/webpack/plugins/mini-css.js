const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { assets } = require('../../utils/paths');

module.exports = new MiniCssExtractPlugin({
    filename  : assets('css/[name].[contenthash].css')
});
