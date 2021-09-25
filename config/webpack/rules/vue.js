const { isPro } = require('../../utils/env');

module.exports = {
    test    : /.vue$/i,
    loader  : 'vue-loader',
    options : {
        cacheBusting       : !isPro,
        transformAssetUrls : {
            image  : 'xlink:href',
            img    : 'src',
            source : 'src',
            video  : [ 'src', 'poster' ]
        }
    }
};
