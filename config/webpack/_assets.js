const path  = require('path');

module.exports = config =>
    config.assets = pathname =>
        path.posix.join(config.assetsSubDirectory, pathname);
