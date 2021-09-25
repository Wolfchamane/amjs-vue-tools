const chalk = require('chalk');
const {WebpackProgressOraPlugin} = require('webpack-progress-ora-plugin');

module.exports = new WebpackProgressOraPlugin({
    pattern : chalk.bold('[') + ':percent:%' + chalk.bold('] ') + chalk.cyan.bold(':text:')
});
