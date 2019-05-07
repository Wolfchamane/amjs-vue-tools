const path = require('path');

module.exports = {
    test : /\.m?js$/,
    exclude : /node_modules\/(?!(?:@am))/,
    include : [
        path.resolve('src'),
        path.dirname(require.resolve('webpack-dev-server/client')),
    ],
    loader : 'babel-loader',
    type : 'javascript/auto'
};
