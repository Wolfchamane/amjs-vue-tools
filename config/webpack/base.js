/* eslint global-require: [0] */
const config = require('../index');
const path = require('path');
const resolver = require('../resolver');
const loaderUrl = require(resolver('config/webpack/loader/url'));
const SassLintWebpackPlugin = require(resolver('config/webpack/plugin/sass-lint'));
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const { isPro = false } = require('../node-tools');

module.exports = {
    mode  : isPro ? 'production' : 'development',
    entry : {
        app : './src/index.js'
    },
    output : {
        filename   : `${ isPro ? '[name].[hash]' : '[name]' }.js`,
        path       : config.assetsRoot,
        publicPath : config.assetsPublicPath
    },
    resolve : {
        symlinks   : false,
        extensions : ['.js', '.vue', '.mjs', '.json'],
        alias      : {
            vue$ : 'vue/dist/vue.esm.js',
            '@'  : path.resolve('src')
        }
    },
    optimization    : {
        minimize    : isPro
    },
    module      : {
        rules : [
            require(resolver('config/webpack/loader/vue'))(isPro),
            require(resolver('config/webpack/loader/eslint')),
            require(resolver('config/webpack/loader/babel')),
            require(resolver('config/webpack/loader/pug')),
            require(resolver('config/webpack/loader/css'))(isPro),
            loaderUrl(['png', 'jpe?g', 'gif', 'svg'], 'images'),
            loaderUrl(['aac', 'flac', 'mp3', 'mp4', 'ogg', 'wav', 'webm'], 'media'),
            loaderUrl(['eot', 'otf', 'ttf', 'woff2?'], 'fonts')
        ]
    },
    plugins : [
        new VueLoaderPlugin(),
        new SassLintWebpackPlugin({
            configFile  : path.resolve(__dirname, '..', '..', '.sass-lint.yml'),
            failOnError : isPro,
            glob        : 'src/**/*.sass'
        })
    ],
    node : {
        // Previene que webpack inyecte inútiles setImmediate polyfills porque
        // Vue ya lo contiene.
        setImmediate    : false,
        // Previene que webpack inyecte mocks para los módulos nativos que no
        // Tienen sentido en el cliente.
        dgram           : 'empty',
        fs              : 'empty',
        net             : 'empty',
        tls             : 'empty',
        child_process   : 'empty' // eslint-disable-line
    }
};
