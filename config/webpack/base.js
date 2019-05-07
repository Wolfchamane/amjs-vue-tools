const isPro = require('node-env-tools').isPro();
const path = require('path');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    mode    : isPro ? 'production' : 'development',
    entry   : {
        app : './src/index.js'
    },
    output : {
        filename    : '[name].js',
        path        : path.resolve(isPro ? 'dist' : 'build'),
        publicPath  : '/'
    },
    resolve : {
        symlinks : false,
        extensions : ['.js', '.vue', '.mjs'],
        alias : {
            vue$: 'vue/dist/vue.js',
            '@' : path.resolve('src')
        }
    },
    module : {
        rules : [
            require('./loaders/vue')(isPro),
            require('./loaders/babel'),
            require('./loaders/pug'),
            require('./loaders/sass')(isPro)
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new StyleLintPlugin({
            configFile  : path.resolve('.stylelintrc.yml'),
            context     : path.resolve('src'),
            emitErrors  : true,
            failOnError : isPro,
            files       : '**/*.(sa|sc|c)ss$',
            syntax      : 'sass'
        })
    ],
    node : {
        setImmediate    : false,
        dgram           : 'empty',
        fs              : 'empty',
        net             : 'empty',
        tls             : 'empty',
        child_process   : 'empty'
    }
};
