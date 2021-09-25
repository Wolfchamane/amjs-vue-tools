const TerserPlugin = require('terser-webpack-plugin');

module.exports = new TerserPlugin({
    parallel        : true,
    extractComments : true
});
