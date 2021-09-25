const path = require('path');
const fs = require('fs');
const { assetsSubDirectory } = require('../../utils/paths');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const from = path.resolve('static');

/**
 * Copia assets estáticos personalizados.
 */
module.exports = fs.existsSync(from)
    ? new CopyWebpackPlugin({
        patterns : [
            { from, to : assetsSubDirectory, globOptions : { ignore : ['.*'] }}
        ]
    }) : null;
