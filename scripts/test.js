const config   = require('../config/jest/config');
const argv     = process.argv.slice(2);
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
