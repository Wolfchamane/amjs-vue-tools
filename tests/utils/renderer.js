/* istanbul ignore file */
const vsr = require('vue-server-renderer');
const Vue = require('vue');

/**
 * Devuelve el contenido del componente al renderizarse.
 *
 * @param {Object}  Component Configuración del componente de Vue a renderizar.
 * @param {Object}  propsData Valores a aplicar al componente.
 * @param {Boolean} ssr       Indica si se debe renderizar usando SSR.
 *
 * @return {Object|Promise} Contenido al renderizar el componente o una promesa si se usa SSR.
 */
module.exports = function (Component, propsData = {}, ssr = false)
{
    const Class = Vue.extend(Component);
    const _instance = new Class({ propsData });

    return ssr ? vsr.createRenderer().renderToString(_instance) : _instance.$mount();
};
