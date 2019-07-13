const { common } = require('../_common');
module.exports = (extensions, subDir) =>
    ({
        test    : new RegExp(`\\.(${extensions.join('|')})(\\?.*)?$`),
        loader  : 'url-loader',
        options : {
            limit : 10000,
            name  : common.assets(`${subDir}/[name].[hash:7].[ext]`)
        }
    });
