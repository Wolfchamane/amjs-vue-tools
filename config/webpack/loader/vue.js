const config = require('../../index');

module.exports = isPro => ({
    test    : /\.vue$/,
    loader  : 'vue-loader',
    options : {
        cssSourceMap       : !isPro,
        cacheBusting       : config.cacheBusting,
        transformToRequire : {
            image  : 'xlink:href',
            img    : 'src',
            source : 'src',
            video  : ['src', 'poster']
        }
    }
});
