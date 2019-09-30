/**
 * Funciones comunes a los tranformadores de código.
 *
 * @see https://github.com/facebook/jest/blob/master/packages/jest-runtime/src/script_transformer.js
 */
const babelCore = require('@babel/core');
const babelrc = require('../webpack/loader/babel').options;
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
// ------------------------------------------------------------------------------
// Personalización de la configuración de Babel.
// ------------------------------------------------------------------------------
Object.assign(babelrc, {
    babelrc    : false,
    sourceMaps : true
});
// ------------------------------------------------------------------------------
/**
 * Configuración de Babel usada para generar la clave del caché.
 *
 * @type {String}
 */
const strOpt = JSON.stringify(babelrc);
/**
 * Configuración común a los transformadores de código.
 */
module.exports = {
    babelrc,
    /**
     * Compila un archivo ES usando Babel.
     *
     * @param {String}  dir         Ruta del directorio donde se encuentra el archivo.
     * @param {String}  name        Nombre del archivo.
     * @param {Object}  options     Configuración de Babel.
     * @param {Boolean} addIstanbul Si es `true` se agrega el plugin de istanbul.
     *
     * @return {Object|null} Resultado de la compilación.
     */
    compileJs(dir, name, options, addIstanbul = true)
    {
        const _filename = path.join(dir, name);
        if (addIstanbul)
        {
            const _plugins = options.plugins;
            if (Array.isArray(_plugins))
            {
                if (!_plugins.includes('istanbul'))
                {
                    options.plugins = ['istanbul', ..._plugins];
                }
            }
            else
            {
                options.plugins = ['istanbul'];
            }
        }

        return fs.existsSync(_filename) ? babelCore.transformFileSync(_filename, options) : null;
    },
    /**
     * Construye la clave del caché de Jest.
     *
     * @param {String} fileContent  Contenido del archivo.
     * @param {String} filename     Ruta del archivo siendo procesado.
     * @param {String} config       Configuración serializada.
     * @param {String} cacheOptions Opciones del caché.
     *
     * @return {String} Hash a usar como clave del caché.
     */
    getCacheKey(fileContent, filename, config, cacheOptions)
    {
        return crypto
            .createHash('md5')
            .update(__filename)
            .update('\0', 'utf8')
            .update(fileContent)
            .update('\0', 'utf8')
            .update(path.relative(cacheOptions.rootDir, filename))
            .update('\0', 'utf8')
            .update(config)
            .update('\0', 'utf8')
            .update(strOpt)
            .update('\0', 'utf8')
            .update(cacheOptions.instrument ? 'instrument' : '')
            .digest('hex');
    },
    /**
     * Devuelve el contenido del archivo.
     *
     * @param {String} dir  Ruta del directorio donde se encuentra el archivo.
     * @param {String} name Nombre del archivo.
     *
     * @return {String|null} Contenido del archivo.
     */
    loadFile(dir, name)
    {
        const _filename = path.join(dir, name);

        return fs.existsSync(_filename) ? fs.readFileSync(_filename, 'utf8') : null;
    }
};
