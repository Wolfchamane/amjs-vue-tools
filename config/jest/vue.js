const babelCore = require('@babel/core');
const babelTemplate = require('babel-template');
const chalk = require('chalk');
const common = require('./common');
const path = require('path');
const pug = require('pug');
const vueCompiler = require('vue-template-compiler');
const vueTranspiler = require('vue-template-es2015-compiler');

/**
 * Genera el plugin de Babel para agregar el código especificado.
 *
 * @param {String} render          Contenido a renderizar.
 * @param {String} staticRenderFns Contenido adicional renderizar.
 *
 * @return {Function} Plugin generado.
 */
function babelPlugin(render, staticRenderFns)
{
    const _vueOptions = babelTemplate(
        `
            var __vue__options__ = typeof module.exports === "function"
                ? module.exports.options 
                : module.exports;
            __vue__options__.render = ${render};
            __vue__options__.staticRenderFns = ${staticRenderFns};
        `
    );

    return () =>
        (render && staticRenderFns
            ? {
                visitor : {
                    Program : {
                        /**
                           * @override
                           */
                        exit(node)
                        {
                            node.pushContainer('body', _vueOptions());
                        }
                    },
                    /**
                       * @override
                       */
                    MemberExpression(n)
                    {
                        if (n.get('object.name').node === 'exports' && n.get('property.name').node === 'default')
                        {
                            const _types = babelCore.types;
                            n.replaceWith(
                                _types.memberExpression(_types.identifier('module'), _types.identifier('exports'))
                            );
                        }
                    }
                }
            }
            : {});
}

/**
 * Compila la plantilla del componente.
 *
 * @param {String} html Contenido de la plantilla.
 * @param {String} dir  Directorio del componente.
 *
 * @return {Object} Plantilla compilada.
 */
function compileHtml(html, dir)
{
    const _html = vueCompiler.compile(html);
    if (_html.errors.length)
    {
        // eslint-disable-next-line
        console.log(['', ..._html.errors.map(msg => chalk.red(msg)), ''].join('\n'));
        throw new Error(`Error al compilar la plantilla del componente ${chalk.cyan(path.basename(dir))}`);
    }

    return _html;
}

/**
 * Envuelve el código en una función y lo transpila.
 *
 * @param {String} code Código a transpilar.
 *
 * @return {String} Código transpilado.
 */
function stringify(code)
{
    return vueTranspiler(`function render() { ${code} }`);
}

/**
 * Configuración requerida por Jest para el transformador de código.
 *
 * @type {Object}
 */
module.exports = {
    canInstrument : true,
    getCacheKey   : common.getCacheKey,
    /**
     * @override
     */
    process(src, filename /* , config, transformOptions*/)
    {
        const _babel = Object.assign({}, common.babelrc);
        const _dir = path.dirname(filename);
        const _pugFile = common.loadFile(_dir, 'template.pug');
        let _html = _pugFile ? pug.render(_pugFile, { filename }) : common.loadFile(_dir, 'template.html');
        if (_html)
        {
            _html = compileHtml(_html, _dir);
            _babel.plugins = [
                ..._babel.plugins,
                babelPlugin(stringify(_html.render), `[ ${_html.staticRenderFns.map(stringify).join(',')} ]`)
            ];
        }

        return common.compileJs(_dir, 'script.js', _babel);
    }
};
