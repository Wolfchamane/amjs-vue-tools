/* eslint global-require: [0] */

let plugin;
const staticDir = require('path').resolve('public');
if (require('fs').existsSync(staticDir))
{
    const CopyWebpackPlugin = require('copy-webpack-plugin');
    plugin = new CopyWebpackPlugin([
        {
            from   : staticDir,
            to     : require('../_common').assetsSubDirectory,
            ignore : ['.*']
        }
    ]);
}

/**
 * Copia assets estáticos personalizados.
 */
module.exports = plugin;
