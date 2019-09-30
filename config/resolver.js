const fs = require('fs');
const path = require('path');

module.exports = module =>
{
    let _file = path.join(...module.split('/'));
    if (!_file.endsWith('.js'))
    {
        _file += '.js';
    }
    let _filename = path.resolve(_file);
    if (!fs.existsSync(_filename))
    {
        _filename = path.resolve('node_modules', '@eurobits', 'vue-tools', _file);
    }

    return fs.existsSync(_filename)
        ? _filename
        : null;
};
