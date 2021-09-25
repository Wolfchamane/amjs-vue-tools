const StylelintWebpackPlugin = require('stylelint-webpack-plugin');
const { isPro, resolver }	 = require('../../utils');

module.exports = new StylelintWebpackPlugin({
    configFile		: resolver('.stylelintrc'),
    files   		: '**/*.scss',
    failOnError		: isPro,
    failOnWarning	: isPro
});
