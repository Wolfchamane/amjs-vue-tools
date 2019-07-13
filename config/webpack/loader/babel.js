const path = require('path');
const { common } = require('../_common');

module.exports = {
    test    : /\.m?js$/,
    loader  : 'babel-loader',
    exclude : /node_modules/,
    include : [
        common.srcPath,
        path.dirname(require.resolve('webpack-dev-server/client'))
    ],
    type    : 'javascript/auto'
};
