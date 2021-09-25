const fileResolver  = require('@amjs/file-resolver');
const path          = require('path');
const { isPro }     = require('./env');

const { name } = require(path.resolve(__dirname, '..', '..', 'package.json'));

module.exports = (file = '', ext = '.js') =>
    fileResolver({ file, ext, module : name, silent : isPro });
