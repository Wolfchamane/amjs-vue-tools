const path = require('path');
const cwd = process.cwd();
const setup = [path.join(cwd, 'tests', '_setup.js')];
const env = process.env.NODE_ENV;

module.exports = {
    testRegex                  : '/tests/[^_].+.js$',
    coverageDirectory          : '<rootDir>/coverage',
    collectCoverageFrom        : [
        'src/**/*.js',
        '!src/index.js',
        '!tests/_setup.js',
        '!**/node_modules/**'
    ],
    coveragePathIgnorePatterns : [
        'tests/_.+.js$',
        '/node_modules/'
    ],
    coverageThreshold          : {
        global : {
            branches   : 90,
            functions  : 90,
            lines      : 90,
            statements : -10
        }
    },
    moduleFileExtensions : ['js', 'json', 'mjs'],
    moduleNameMapper     : {
        '^%/(.*)$' : '<rootDir>/$1',
        '^@/(.*)$' : '<rootDir>/src/$1',
        '^#/(.*)$' : '<rootDir>/tests/$1'
    },
    rootDir             : cwd,
    roots               : ['<rootDir>/src', '<rootDir>/tests'],
    setupFiles          : setup,
    transform           : {
        '\\.js$' : path.join(cwd, 'config', 'jest', 'babel.js')
    },
    transformIgnorePatterns : ['node_modules/(?!(?:@amjs|react))'],
    globals                 : {
        APP_CONFIG : require(path.join(cwd, 'config', 'env', `${env}.js`))
    }
};
