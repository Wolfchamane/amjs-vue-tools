const net = require('node-env-tools');

const isPro = net.isPro();

module.exports = {
    isPro,
    isDev: !isPro
};
