const EslintWebpackPlugin = require('eslint-webpack-plugin');
const { isPro, resolver } = require('../../utils');
const path                = require('path');

module.exports = new EslintWebpackPlugin({
    exclude 		: ['node_modules']
        .concat(require(resolver(path.join('config', 'utils', 'babel-excluded'))))
        .filter(Boolean),
    files			: 'src/**/*.m?js',
    overrideConfig  : { ...require(resolver('.eslintrc')) },
    failOnError		: isPro,
    failOnWarning	: isPro
});
