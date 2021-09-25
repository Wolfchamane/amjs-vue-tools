const { isPro, resolver, assetsRoot, assetsPublicPath, assets } = require('../utils');
const path      = require('path');

const urlLoader = require(resolver(path.join('config', 'webpack', 'rules', 'url')));

module.exports = {
    mode        : isPro ? 'production' : 'development',
    devtool     : isPro ? 'source-map' : 'cheap-module-source-map',
    entry       : {
        app : './src/index.js'
    },
    output : {
        filename        : `${ isPro ? assets('js/[name].[chunkhash]') : '[name]' }.js`,
        path            : assetsRoot,
        publicPath      : assetsPublicPath
    },
    optimization    : {
        minimize    : isPro
    },
    resolve : {
        symlinks   : false,
        extensions : ['.js', '.vue', '.mjs', '.json'],
        alias      : {
            vue$ : 'vue/dist/vue.esm.js',
            '@'  : path.resolve('src')
        }
    },
    module      : {
        rules   : [
            require(resolver(path.join('config', 'webpack', 'rules', 'vue'))),
            require(resolver(path.join('config', 'webpack', 'rules', 'babel'))),
            require(resolver(path.join('config', 'webpack', 'rules', 'sass'))),
            require(resolver(path.join('config', 'webpack', 'rules', 'pug'))),
            urlLoader(['png', 'jpe?g', 'gif', 'svg'], 'images'),
            urlLoader(['aac', 'flac', 'mp3', 'mp4', 'ogg', 'wav', 'webm'], 'media'),
            urlLoader(['eot', 'otf', 'ttf', 'woff2?'], 'fonts')
        ]
    },
    plugins     : [
        require(resolver(path.join('config', 'webpack', 'plugins', 'define')))(),
        require(resolver(path.join('config', 'webpack', 'plugins', 'vue'))),
        require(resolver(path.join('config', 'webpack', 'plugins', 'html')))(),
        require(resolver(path.join('config', 'webpack', 'plugins', 'copy')))
    ].filter(Boolean)
};
