const { isPro } = require('./env');
const path      = require('path');

const assetsSubDirectory = '';

module.exports = {
    assetsSubDirectory,
    assetsPublicPath    : isPro ? './' : '/',
    assetsRoot          : path.resolve(isPro ? 'dist' : 'static'),
    assets              : ( pathname = '' ) =>
        path.posix.join(assetsSubDirectory, pathname)
};
