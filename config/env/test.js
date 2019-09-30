const merge = require('webpack-merge');

module.exports = merge(
    require('./dev'),
    {
        NODE_ENV : '"testing"'
    }
);
