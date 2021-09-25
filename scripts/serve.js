#!/usr/bin/env node

const resolver      = require('../config/utils/resolver');
const path          = require('path');
const customArgs    = require('../config/utils/custom-args');

process.argv.push(
    'serve',
    '--inline',
    '--progress',
    '--config',
    resolver(path.join('config', 'webpack', 'dev'))
);

customArgs.forEach(
    arg =>
    {
        if (process.argv.includes(arg))
        {
            process.argv.splice(process.argv.indexOf(arg), 1);
        }
    }
)

require(resolver(path.join('node_modules', '.bin', 'webpack'), ''));
