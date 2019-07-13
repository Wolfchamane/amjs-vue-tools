const { DefinePlugin } = require('webpack');
const chalk            = require('chalk');
const path              = require('path');
const fs                = require('fs');
/**
 * Plugin para definir variables de entorno.
 *
 * @param {Object} env Valores del entorno a definir.
 *
 * @return {webpack.DefinePlugin} Instancia del plugin.
 */
module.exports = env =>
{
    const _filename = path.resolve(__dirname, '..', '..', 'env', `${env}.js`);
    if (!fs.existsSync(_filename))
    {
        console.log('Archivo de configuración para el entorno %s no encontrado', chalk.red(env));
        process.exit(-1);
    }

    return new DefinePlugin(
        {
            'process.env' : JSON.stringify(require(_filename))
        }
    );
};
