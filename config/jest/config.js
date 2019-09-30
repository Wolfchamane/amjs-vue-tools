const fs = require('fs');
const path = require('path');
const cwd = process.cwd();
const root = path.resolve(__dirname, '..', '..');
const setup = [];
const file = path.resolve(cwd, '__tests__', '_setup.js');
if (fs.existsSync(file))
{
    setup.push(file);
}

module.exports = {
    testRegex                   : '__tests__/[^_].+js$',
    collectCoverageFrom         : [
        'src/**/*.{mjs,js}',
        '!**/__tests__/**',
        '!**/node_modules/**',
        '!**/demo/**',
        '!**/mock.{mjs,js}'
    ],
    coverageDirectory           : '<rootDir>/coverage',
    coveragePathIgnorePatterns  : [
        '/node_modules/',
        '/src/index.m?js'
    ],
    coverageThreshold           : {
        global : {
            branches   : 90,
            functions  : 90,
            lines      : 90,
            statements : -10
        }
    },
    moduleFileExtensions : ['js', 'json', 'mjs', 'vue'],
    moduleNameMapper     : {
        '^%/(.*)$' : `${root}/$1`,
        '^@/(.*)$' : '<rootDir>/src/$1',
        '^#/(.*)$' : '<rootDir>/__tests__/$1'
    },
    rootDir             : cwd,
    roots               : ['<rootDir>/src', '<rootDir>/__tests__'],
    setupFiles          : setup,
    snapshotSerializers : ['jest-serializer-vue'],
    transform           : {
        '\\.m?js$' : `${root}/config/jest/babel.js`,
        '\\.vue$'  : `${root}/config/jest/vue.js`
    },
    transformIgnorePatterns : ['node_modules/(?!(?:@eurobits))']
};
