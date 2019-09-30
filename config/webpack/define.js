/* eslint-disable global-require, no-console */
const { DefinePlugin } = require('webpack');
const chalk            = require('chalk');
const resolver         = require('../resolver');
/**
 * Plugin para definir variables de entorno.
 *
 * @param {Object} env Valores del entorno a definir.
 *
 * @return {webpack.DefinePlugin} Instancia del plugin.
 */
module.exports = env =>
{
    const _filename = resolver(`config/env/${env || 'dev'}`);
    if (!_filename)
    {
        console.log('Archivo de configuración para el entorno %s no encontrado', chalk.red(env));
        process.exit(-1);
    }

    return new DefinePlugin(
        {
            'process.env' : require(_filename)
        }
    );
};
