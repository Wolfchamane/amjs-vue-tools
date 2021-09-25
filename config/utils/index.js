const resolver = require('./resolver');
const path     = require('path');

module.exports = {
    ...require(resolver(path.join('config', 'utils', 'env'))),
    ...require('./paths'),
    resolver
};
