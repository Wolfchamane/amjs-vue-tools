const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

/**
 * Verifica si un valor es un objeto.
 *
 * @param {*} value Valor a verificar.
 *
 * @return {Boolean} `true` si es un objeto.
 */
function isObject(value)
{
    return value && typeof value === 'object' && !Array.isArray(value);
}

/**
 * Agrega las propiedades de `src` a `dst`.
 *
 * @param {Object} dst Objeto que recibirá las propiedades.
 * @param {Object} src Objeto con las propiedades a agregar.
 *
 * @return {Object} Objeto resultante.
 */
function merge(dst, src)
{
    if (isObject(dst) && isObject(src))
    {
        for (const _key of Object.keys(src))
        {
            const _srcvalue = src[_key];
            const _dstvalue = dst[_key];
            if (isObject(_dstvalue) && isObject(_srcvalue))
            {
                merge(_dstvalue, _srcvalue);
            }
            else
            {
                dst[_key] = _srcvalue;
            }
        }
    }

    return dst;
}

/**
 * Devuelve el contenido del archivo.
 *
 * @param {String} filename Ruta del archivo a leer.
 * @param {String} defValue Valor por defecto a devolver si no se encuentra el archivo.
 *
 * @return {String} Contenido del archivo.
 */
function read(filename, defValue)
{
    return fs.existsSync(filename) ? fs.readFileSync(filename, 'utf8') : defValue;
}

module.exports = {
    /**
     * Fusiona el contenido de objetos leídos desde el mismo archivo en ubicaciones diferentes.
     *
     * @param {Object} dst  Objeto que recibirá las propiedades.
     * @param {String} file Nombre del archivo a fusionar.
     * @param {String} type Tipo de archivo a leer.
     *
     * @return {Object} Resultado de la operación.
     */
    file(dst, file, type)
    {
        return this.object(dst, this[type](path.resolve(__dirname, '..', file), path.resolve(file)));
    },
    /**
     * Carga un listado de archivos JSON y los fusiona.
     *
     * @param {String[]} files Ruta de los archivos a cargar.
     *
     * @return {Object} Objeto resultante.
     */
    json(...files)
    {
        return this.object(
            ...files.map(file =>
            {
                try
                {
                    file = JSON.parse(read(file, '{}'));
                }
                catch (e)
                {
                    /* eslint no-console:[0] */
                    console.log('ERROR (%s): %s', file, e.message);
                    file = {};
                }

                return file;
            })
        );
    },
    /**
     * Fusiona las propiedades de todos los objetos.
     *
     * @param {Object}   dst Objeto que recibirá todas las propiedades.
     * @param {Object[]} src Objetos a fusionar con `dst`.
     *
     * @return {Object} Objeto resultante.
     */
    object(dst, ...src)
    {
        src.forEach(s => merge(dst, s));

        return dst;
    },
    /**
     * Carga un listado de archivos YAML y los fusiona.
     *
     * @param {String[]} files Ruta de los archivos a cargar.
     *
     * @return {Object} Objeto resultante.
     */
    yaml(...files)
    {
        return this.object(...files.map(file => yaml.load(read(file, '')) || {}));
    }
};
