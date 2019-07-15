const common = require('./common');
const path = require('path');
/**
 * Configuración requerida por Jest para el transformador de código.
 *
 * @type {Object}
 */
module.exports = {
    canInstrument : false,
    getCacheKey   : common.getCacheKey,
    /**
     * @override
     */
    process(src, filename /* , config, transformOptions*/)
    {
        return common.compileJs(
            path.dirname(filename),
            path.basename(filename),
            Object.assign({}, common.babelrc),
            false
        );
    }
};
