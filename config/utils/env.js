const net           = require('@jf/node-env-tools');
const customArgs    = require('./custom-args');

const withProxy = process.argv.includes(customArgs[0])

module.exports = {
    isPro       : net.isPro(),
    isTest      : process.env.NODE_ENV === 'test',
    // For development server
    port        : net.get('PORT') || 8080,
    host        : net.get('HOST') || 'localhost',
    withProxy,
    // For production
    MAX_SIZE    : net.get('MAX_SIZE') || 10000000
}
