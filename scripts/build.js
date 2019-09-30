const chalk         = require('chalk');
const config        = require('../config');
const ora           = require('ora');
const path          = require('path');
const resolver      = require('../config/resolver');
const rm            = require('rimraf');
const webpack       = require('webpack');
const webpackConfig = require(resolver('config/webpack/pro'));

const spinner = ora(`Compilando para entorno ${process.env.NODE_ENV || 'production'}...`);
spinner.start();

rm(
    path.join(config.assetsRoot, config.assetsSubDirectory),
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
                    console.log(chalk.red('  Errores en la compilación.\n'));
                    process.exit(1);
                }
                console.log(chalk.cyan('  Compilación completada.\n'));
            }
        );
    }
);
