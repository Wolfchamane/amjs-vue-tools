#!/usr/bin/env node

const path = require('path');

process.argv.push(
    '--inline',
    '--progress',
    '--config',
    path.resolve(__dirname, '..', 'config', 'webpack')
);

console.log(process.argv);

require('webpack-dev-server/bin/webpack-dev-server');
