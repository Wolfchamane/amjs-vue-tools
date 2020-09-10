const fs            = require('fs');
const path          = require('path');
const resolver      = require('../config/resolver');
const cwd           = process.cwd();
const config        = require(resolver('config/nightwatch/index.js'));
const chalk         = require('chalk');
const browsers      = ['chrome'];
let driver          = process.argv.pop();

try
{
    if (!browsers.includes(driver))
    {
        throw new Error('unsupported-driver');
    }

    const settings      = config(driver);
    let defSettingsPath = path.join(cwd, 'nightwatch.json');
    let defSettings     = require(defSettingsPath);

    if (!defSettings || JSON.stringify(settings) !== JSON.stringify(defSettings))
    {
        console.log(`${chalk.bold('Writing e2e configuration file')}`);
        fs.writeFileSync(
            defSettingsPath,
            JSON.stringify(settings, null, 4),
            'utf-8');
    }

    console.log(`Riding e2e tests on ${chalk.red(driver)}`);
    require('nightwatch/bin/runner.js');
    process.exit(0);
}
catch (e)
{
    if (e.message === 'unsupported-driver')
    {
        console.log(`[ERROR] Unsupported driver "${chalk.red(driver)}". Available are: ${browsers.join()}`);
    }
    else
    {
        console.log(`[ERROR] ${e.message}`);
    }
    process.exit(1);
}
