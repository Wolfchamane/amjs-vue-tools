#!/usr/bin/env node

const chalk         = require('chalk');
const ora           = require('ora');
const path          = require('path');
const { assetsRoot, assetsSubDirectory, resolver }  = require('../config/utils');
const rm            = require('rimraf');
const webpack       = require('webpack');
const webpackConfig = require(resolver(path.join('config', 'webpack', 'pro')));

const spinner = ora(`Compiling for ${process.env.NODE_ENV || 'production'}...`);
spinner.start();

rm(
    path.join(assetsRoot, assetsSubDirectory),
    err =>
    {
        if (err)
        {
            throw err;
        }
        webpack(
            webpackConfig,
            (err, stats) =>
            {
                spinner.stop();
                if (err)
                {
                    throw err;
                }
                process.stdout.write(
                    stats.toString(
                        {
                            colors       : true,
                            modules      : false,
                            children     : false,
                            chunks       : false,
                            chunkModules : false
                        }
                    ) + '\n\n'
                );

                if (stats.hasErrors())
                {
                    console.log(chalk.red('  Errors while compilation.\n'));
                    process.exit(1);
                }
                console.log(chalk.cyan('  Compilation completed.\n'));
            }
        );
    }
);
