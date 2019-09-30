const path = require('path');
/**
 * Exporta algunas utilidades para trabajar con la configuración de webpack.
 *
 * @type {Object}
 */
module.exports = {
    /**
     * Agrega un listado de módulos a la opción `include` del loader de webpack.
     *
     * @param {Object}   config  Configuración de webpack.
     * @param {String}   name    Nombre del loader a modificar.
     * @param {String[]} modules Listado de módulos a agregar.
     */
    addToInclude(config, name, modules)
    {
        const _loader = this.findLoader(config, name);
        if (_loader)
        {
            const _include = _loader.include;
            if (Array.isArray(_include))
            {
                const _modules = path.resolve('node_modules');
                for (const _module of modules)
                {
                    const _filename = path.join(_modules, _module);
                    if (!_include.includes(_filename))
                    {
                        _include.push(_filename);
                    }
                }
            }
        }
    },
    /**
     * Agrega un listado de módulos al opción `exclude` del loader de webpack.
     *
     * @param {Object}   config  Configuración de webpack.
     * @param {String}   name    Nombre del loader a modificar.
     * @param {String[]} modules Listado de módulos a agregar.
     */
    addToExclude(config, name, modules)
    {
        const _loader = this.findLoader(config, name);
        if (_loader)
        {
            _loader.exclude = new RegExp(`node_modules/(?!${modules.join('|')})`);
        }
    },
    /**
     * Encuentra la configuración del loader dentro de la configuración de webpack.
     *
     * @param {Object} config Configuración de webpack.
     * @param {String} name   Nombre del loader a buscar.
     *
     * @return {Object} Configuración del loader o `undefined`.
     */
    findLoader(config, name)
    {
        return (
            config &&
            config.module &&
            config.module.rules.find(rule => rule.loader === name || (rule.use && rule.use.loader === name))
        );
    }
};
