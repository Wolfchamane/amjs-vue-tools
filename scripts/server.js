#!/usr/bin/env node
process.argv.push(
    '--inline',
    '--progress',
    '--config',
    require('../config/resolver')('config/webpack/dev.js')
);

require('webpack-dev-server/bin/webpack-dev-server');
