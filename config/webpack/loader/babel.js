const merge = require('../../merge');
const path = require('path');
const fs = require('fs');

// Incluímos todas las dependencias conocidas qué deben ser transpiladas
const toInclude = [];
const toExclude = [];
[].forEach(
    item =>
    {
        const itemPath = path.resolve('node_modules', item);
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
        ...merge.file({}, '.babelrc', 'json')
    }
};


