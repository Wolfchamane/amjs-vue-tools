const merge = require('webpack-merge');

module.exports = merge(
    require('./pro'),
    {
        NODE_ENV : '"development"'
    }
);
