const net = require('node-env-tools');
const path = require('path');
const { isDev = false } = require('./node-tools');

const common = {
    // Rutas
    assetsPublicPath          : isDev ? '/' : './',
    assetsSubDirectory        : '',
    // Configuración del servidor.
    host                      : 'localhost', // Puede ser sobrescrito usando process.env.HOST
    port                      : 8080,        // Puede ser sobrescrito usando process.env.PORT.
    notifyOnErrors            : isDev,
    productionGzip            : !isDev,
    productionGzipExtensions  : ['css', 'js', 'json'],
    // eslint
    useEslint                 : isDev,
    showEslintErrorsInOverlay : isDev,
    // Css
    cssSourceMap              : isDev,
    productionSourceMap       : isDev
};
if (isDev)
{
    Object.assign(common, {
        ...common,
        // Rutas
        assetsRoot      : path.resolve('static'),
        proxyTable      : {},
        // Configuración del servidor.
        autoOpenBrowser : false,
        poll            : false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
        // https://webpack.js.org/configuration/devtool/#development
        devtool         : 'cheap-module-eval-source-map',
        cacheBusting    : true // Poner a false si hay problemas para usar vue-tools
    });
}
else
{
    Object.assign(common, {
        ...common,
        // Plantilla para index.html
        index                : path.resolve('dist', 'index.html'),
        // Rutas
        assetsRoot           : path.resolve('dist'),
        // https://webpack.js.org/configuration/devtool/#production
        devtool              : '#source-map',
        bundleAnalyzerReport : net.get('npm_config_report')
    });
}
module.exports = common;
