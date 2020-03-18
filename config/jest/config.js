const fs = require('fs');
const path = require('path');
const cwd = process.cwd();
const root = path.resolve(__dirname, '..', '..');
const setup = [];
const file = path.resolve(cwd, 'tests', '_setup.js');
if (fs.existsSync(file))
{
    setup.push(file);
}

module.exports = {
    testRegex                   : 'tests/[^_].+js$',
    collectCoverageFrom         : [
        'src/**/*.{mjs,js}',
        '!**/tests/**',
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
