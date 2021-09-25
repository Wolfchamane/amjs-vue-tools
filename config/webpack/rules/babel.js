const path      = require('path');
const resolver  = require('../../utils/resolver');
const fs        = require('fs');

const toInclude = [];
const toExclude = [];
require(resolver(path.join('config', 'utils', 'babel-excluded'))).forEach(
    item =>
    {
        const itemPath = path.resolve('node_modules', ...item.split(path.sep));
        const exists = fs.existsSync(itemPath);
        if (exists)
        {
            toInclude.push(itemPath);
            toExclude.push(item);
        }
    }
);

module.exports = {
    test    : /\.m?js$/,
    loader  : 'babel-loader',
    exclude : new RegExp(`node_modules/(?!(?:(${toExclude.join('|')})))(\\?.*)?$`, 'gi'),
    include : [
        path.resolve('src'),
        path.dirname(require.resolve('webpack-dev-server/client')),
        ...toInclude
    ],
    type    : 'javascript/auto',
    options : {
        babelrc : false,
        ...require(resolver('.babelrc'))
    }
};
