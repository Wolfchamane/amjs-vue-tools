module.exports = {
    'env'     : {
        'test' : {
            'plugins' : [
                'istanbul'
            ]
        }
    },
    'presets' : [
        [
            '@babel/preset-env',
            {
                'modules'          : false,
                'shippedProposals' : true
            }
        ]
    ],
    'plugins' : [
        [ '@babel/plugin-proposal-class-properties', { 'loose' : false } ],
        [ '@babel/plugin-proposal-private-methods', { 'loose' : false } ],
        '@babel/plugin-proposal-throw-expressions',
        '@babel/plugin-transform-modules-commonjs',
        '@babel/plugin-transform-runtime'
    ]
};
