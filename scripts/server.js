#!//usr/bin/env node

const chalk = require('chalk');
const path = require('path');

process.argv.push(
    '--inline',
    '--progress',
    '--config',
    path.resolve(process.cwd(), 'node_modules', 'am-vue-tools', 'config', 'webpack', 'dev')
);

console.log(`[@am/vue-tools] Running ${chalk.blue('vue')} webpack config for ${chalk.yellow('development')}`);
require('webpack-dev-server/bin/webpack-dev-server');
