const paths = require('../../paths');
module.exports = function (extensions, subdir)
{
    return {
        test    : new RegExp(`\\.(${extensions.join('|')})(\\?.*)?$`),
        loader  : 'url-loader',
        options : {
            limit : 10000,
            name  : paths.assets(`${subdir}/[name].[hash:7].[ext]`)
        }
    };
};
