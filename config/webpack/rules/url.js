const { assets } = require('../../utils/paths');

module.exports = (ext, dir) =>
{
    return {
        test    : new RegExp(`\\.(${ext.join('|')})(\\?.*)?$`),
        loader  : 'url-loader',
        options : {
            limit : 10000,
            name  : assets(`${dir}/[name].[hash:7].[ext]`)
        }
    };
};
