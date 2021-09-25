const webpack           = require('webpack');
const { isPro, isTest } = require('../../utils');

module.exports = (options = {}) => new webpack.DefinePlugin({
    ENVIRONMENT : isPro ? '"production"' : isTest ? '"test"' : '"development"',
    ...options
});
