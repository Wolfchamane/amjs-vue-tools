#!/usr/bin/env node
const path = require('path');
const cmd = process.argv.pop();

if (['serve', 'build', 'test'].includes(cmd))
{
    require(path.resolve(__dirname, 'scripts', `${cmd}.js`));
}
else
{
    console.error(`[@amjs/vue-tools] Command "${cmd}" not found`);
    process.exit(1);
}
