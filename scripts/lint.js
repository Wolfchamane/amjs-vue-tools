#!/usr/bin/env node

const chalk = require('chalk');
const path = require('path');
const resolver = require('../config/utils/resolver');
const { ESLint } = require('eslint');
const eslintConf = require(path.join(__dirname, '..', '.eslintrc'));
const StyleLint = require('stylelint');
const styleLintFormatter = require('stylelint/lib/formatters/stringFormatter');
const styleLintRC = resolver('.stylelintrc');
const root = process.cwd();
const fix = process.argv.includes('--fix');

/**
 * Counts all the errors and warnings from Eslint result
 * @param   {Array}     results Map of results
 * @return  {Number}    Total number of errors and warnings
 */
const _hasErrors = (results = []) =>
{
    let fails = 0;
    if (Array.isArray(results))
    {
        fails = results.reduce((acc, item = {}) =>
        {
            // eslintJS errors interface
            if ('errorCount' in item && 'warningCount' in item)
            {
                acc += Number(item.errorCount + item.warningCount);
            }

            // stylelint errors interface
            if ('warnings' in item && Array.isArray(item.warnings))
            {
                acc += item.warnings.length;
            }

            return acc;
        }, 0);
    }

    return fails;
};

/**
 * Logs an error
 * @param   {*}    e   Error to display
 * @private
 */
const _error = e =>
{
    console.log(`[${chalk.red('ERROR')}]`);
    console.log(e);
    process.exit(1);
};

/**
 * Lints all *.js files
 * @param   {*|Function}    resolve To finish promise
 * @param   {*|Function}    reject  To finish promise
 * @return  {Promise}       Linting process
 */
const lintJS = async (resolve, reject) =>
{
    try
    {
        const eslint = new ESLint({
            fix,
            overrideConfig : { ...eslintConf }
        });
        const results = await eslint.lintFiles([
            `${root}/src/**/*.js`,
            `${root}/tests/**/*.js`
        ]);

        if (_hasErrors(results))
        {
            const formatter = await eslint.loadFormatter('stylish');
            console.log(`[${chalk.red.bold('ERROR')}] JS errors found!`);
            console.log(await formatter.format(results));
        }
        else
        {
            console.log(`[${chalk.green('SUCCESS')}] No JS errors found!`);
        }

        resolve();
    }
    catch (e)
    {
        reject(e);
    }
};

/**
 * Lint all *.sass files
 * @see     https://stylelint.io/user-guide/usage/node-api
 * @param   {*|Function}  resolve To resolve promise
 * @param   {*|Function}  reject  To resolve promise
 * @return  {Promise}       Linting progress
 */
const lintSass = async (resolve, reject) =>
{
    try
    {
        const { results } = await StyleLint.lint({
            fix,
            configFile : styleLintRC,
            files      : 'src/**/*.sass',
            formatter  : 'string',
            syntax     : 'sass'
        });

        if (_hasErrors(results))
        {
            console.log(`[${chalk.red.bold('ERROR')}] SASS errors found!`);
            console.log(await styleLintFormatter(results));
        }
        else
        {
            console.log(`[${chalk.green('SUCCESS')}] No SASS errors found!`);
        }

        resolve();
    }
    catch (e)
    {
        reject(e);
    }
};

// --------------------- ENTRY POINT ------------------- //
(() =>
{
    new Promise(lintJS)
        .catch(_error)
        .then(() =>
            new Promise(lintSass)
                .catch(_error)
                .then(() => process.exit(0)));
})();
