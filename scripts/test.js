#!/usr/bin/env node

const { resolver }  = require('../config/utils');
const config        = require(resolver('config/jest/index'));
const argv          = process.argv.slice(2);

if (!argv.includes('--coverage'))
{
    argv.push('--coverage');
}
if (!argv.includes('--no-cache'))
{
    argv.push('--no-cache');
}
argv.push('--config', JSON.stringify(config, null, 4));

require('jest').run(argv);
