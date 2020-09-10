const cwd = process.cwd();
const path = require('path');

module.exports = {
    start_process   : true,
    server_path     : path.join(cwd, ...'node_modules/.bin/chromedriver'.split('/')),
    port            : 3000,
    cli_args        : [
        '--verbose',
        '--port=3000'
    ]
}
