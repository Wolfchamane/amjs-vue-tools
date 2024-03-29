const fs            = require('fs');
const path          = require('path');
const cwd           = process.cwd();
const root          = path.resolve(__dirname, '..', '..');
const setup         = [];
const { resolver }  = require('../utils');
const setupFile     = resolver(path.join('tests', '_setup.js'))
if (fs.existsSync(setupFile))
{
    setup.push(setupFile);
}

module.exports = {
    testRegex                   : 'tests/unit/[^_].+js$',
    collectCoverageFrom         : [
        'src/**/*.{mjs,js}',
        '!**/tests/**',
        '!**/node_modules/**',
        '!**/demo/**',
        '!**/mock.{mjs,js}'
    ],
    coverageDirectory           : '<rootDir>/coverage/unit',
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
        '^#/(.*)$' : '<rootDir>/tests/$1'
    },
    rootDir             : cwd,
    roots               : ['<rootDir>/src', '<rootDir>/tests'],
    setupFiles          : setup,
    snapshotSerializers : ['jest-serializer-vue'],
    transform           : {
        '\\.m?js$' : `${root}/config/jest/babel.js`,
        '\\.vue$'  : `${root}/config/jest/vue.js`
    },
    transformIgnorePatterns : ['node_modules/(?!(?:@amjs))']
};
