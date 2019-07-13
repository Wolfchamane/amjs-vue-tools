const common = require('../_common');

module.exports = isPro => ({
    test    : /\.vue$/,
    loader  : 'vue-loader',
    options : {
        cssSourceMap       : !isPro,
        cacheBusting       : common.cacheBusting,
        transformToRequire : {
            image  : 'xlink:href',
            img    : 'src',
            source : 'src',
            video  : ['src', 'poster']
        }
    }
});
