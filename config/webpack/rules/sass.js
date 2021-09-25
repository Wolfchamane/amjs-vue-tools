const { isPro, resolver }   = require('../../utils');
const MiniCssExtractPlugin  = require('mini-css-extract-plugin');

module.exports                      = {
    test                            : /.s?(a|c)ss$/i,
    exclude                         : /node_modules\/(?!(?:@adhara))/,
    use                             : [
        {
            loader                  : isPro ? MiniCssExtractPlugin.loader : 'style-loader'
        },
        {
            loader                  : 'css-loader',
            options                 : {
                sourceMap           : !isPro
            }
        },
        {
            loader                  : 'postcss-loader',
            options                 : {
                sourceMap           : !isPro,
                postcssOptions      : {
                    ...require(resolver('postcss.config'))
                }
            }
        },
        {
            loader                  : 'sass-loader',
            options                 : {
                sourceMap           : !isPro
            }
        }
    ]
};
