const isDev = require('node-env-tools').isDev();
const path = require('path');

const assetsRoot = path.resolve('public');
const destPath = path.resolve('build');
const srcPath = path.resolve('src');
const testPath = path.resolve('tests');

const common = {
    // Rutas
    assetsPublicPath          : isDev ? '/' : './',
    assetsSubDirectory        : '',
    assetsRoot,
    destPath,
    srcPath,
    testPath,
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
        proxyTable      : {},
        // Configuración del servidor.
        autoOpenBrowser : true,
        poll            : false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
        // https://webpack.js.org/configuration/devtool/#development
        devtool         : 'cheap-module-eval-source-map',
        cacheBusting    : true
    });
}
else
{
    Object.assign(common, {
        ...common,
        // Plantilla para index.html
        index                : path.resolve(destPath, 'index.html'),
        // Rutas
        assetsRoot           : path.resolve(destPath),
        // https://webpack.js.org/configuration/devtool/#production
        devtool              : '#source-map',
        bundleAnalyzerReport : process['npm_config_report'],
    });
}

require('./_plugins')(common, isDev);
require('./_assets')(common);

module.exports = { common, isDev };