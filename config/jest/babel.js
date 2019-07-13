const path = require('path');
const fs = require('fs');
const babelCore = require('@babel/core');
const crypto = require('crypto');
let babelrc = JSON.parse(fs.readFileSync(path.resolve('.babelrc').toString()));

babelrc = Object.assign(babelrc, {
    babelrc    : false,
    sourceMaps : true
});

const strOpt = JSON.stringify(babelrc);

const compileJs = (dir, name, options, addIstanbul = true) =>
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
};

const getCacheKey = (fileContent, filename, config, cacheOptions) =>
    crypto
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

/**
 * Configuración requerida por Jest para el transformador de código.
 *
 * @type {Object}
 */
module.exports = {
    canInstrument : false,
    getCacheKey,
    /**
     * @override
     */
    process(src, filename /* , config, transformOptions*/)
    {
        return compileJs(
            path.dirname(filename),
            path.basename(filename),
            Object.assign({}, babelrc),
            false
        );
    }
};
