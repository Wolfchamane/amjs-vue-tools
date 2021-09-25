/* eslint global-require : 0 */
module.exports = {
    plugins : [
        require('postcss-preset-env'),
        require('postcss-import'),
        require('postcss-url'),
        require('autoprefixer')
    ]
};
