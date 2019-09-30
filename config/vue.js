/**
 * Configura Vue agregando los plugins requeridos y modificando algunas
 * propiedades de configuración.
 */
import Vue from 'vue';
import VuePropSep from 'vue-prop-sep';

// ------------------------------------------------------------------------------
// Configuración de vue.
// ------------------------------------------------------------------------------
Vue.config.productionTip = false;
// ------------------------------------------------------------------------------
// Plugins a usar en odos los proyectos.
// ------------------------------------------------------------------------------
Vue.use(VuePropSep);
