const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const path = require('path');

module.exports = new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    openAnalyzer: false,
    reportFilename: path.resolve('reports', `${Date.now()}.html`),
    statsOptions: {
        colors       : true,
        modules      : false,
        children     : false,
        chunks       : false,
        chunkModules : false
    }
});
