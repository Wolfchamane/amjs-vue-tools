const config = require('./index');
const path = require('path');

module.exports = {
    /**
     * Devuelve la ruta completa de los assets especificados.
     *
     * @param {String} pathname Ruta parcial.
     *
     * @return {String} Ruta completa.
     */
    assets(pathname)
    {
        return path.posix.join(config.assetsSubDirectory, pathname);
    }
};
