const { common, isDev } = require('./_common');

const config = {
    mode   : isDev ? 'development' : 'production',
    target : 'web',
    entry  : './src/index.js',
    output : {
        path        : common.assetsRoot,
        publicPath  : common.assetsPublicPath,
        filename    : 'app.js'
    },
    resolve : {
        symlinks   : false,
        extensions : ['.js', '.mjs', '.json', '.vue'],
        alias      : {
            vue$ : 'vue/dist/vue.esm.js',
            '@'  : common.srcPath
        }
    },
    optimization    : {
        minimize    : !isDev
    },
    module : {
        rules : [
            // require('./loader/eslint'),
            require('./loader/vue')(!isDev),
            require('./loader/pug'),
            require('./loader/babel'),
            require('./loader/css'),
            require('./loader/sass'),
            require('./loader/url')(['png', 'jpe?g', 'gif', 'svg'], 'images'),
            require('./loader/url')(['aac', 'flac', 'mp3', 'mp4', 'ogg', 'wav', 'webm'], 'media'),
            require('./loader/url')(['eot', 'otf', 'ttf', 'woff2?'], 'fonts')
        ]
    },
    node : {
        setImmediate    : false,
        dgram           : 'empty',
        fs              : 'empty',
        net             : 'empty',
        tls             : 'empty',
        child_process   : 'empty' // eslint-disable-line
    }
};

module.exports = config;
