const resolver = require('../resolver');

module.exports = (driver = 'chrome') => ({
    src_folders     : ['tests/e2e'],
    output_folder   : 'coverage/e2e',
    exclude         : ['node_modules', 'tests/**/^_*.js$'],
    webdriver       : require(resolver(`config/nightwatch/webdriver/${driver}.js`)),
    test_settings   : {
        default     : {
            desiredCapabilities: {
                browserName: driver,
                chromeOptions: {
                    args: [
                        '--headless',
                        '--no-sandbox'
                    ]
                }
            }
        }
    }
});
