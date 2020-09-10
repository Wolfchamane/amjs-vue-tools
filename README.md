# @amjs/vue-tools

![npm](https://img.shields.io/npm/v/@amjs/vue-tools?style=flat-square)

Provides development tools for VueJS based projects with Webpack4 and JEST.

## Installation

```bash
$ npm i --save @amjs/vue-tools
```

## Usage

Add following scripts to `package.json` file:

```json
{
    "scripts": {
       "dev": "NODE_ENV=development node node_modules/@amjs/vue-tools/scripts/server.js",
       "build": "NODE_ENV=production node node_modules/@amjs/vue-tools/scripts/build.js",
       "test": "NODE_ENV=test node node_modules/@amjs/vue-tools/scripts/jest.js",
       "format": "prettier --config node_modules/@amjs/vue-tools/.prettierrc --write 'src/**/*.js'",
       "lint:css": "sass-lint --config node_modules/@amjs/vue-tools/.sass-lint.yml -v",
       "lint:js": "eslint --fix --config node_modules/@amjs/vue-tools/.eslintrc.yml --ext .js src __tests__",
       "e2e": "node node_modules/@amjs/vue-tools/scripts/e2e chrome && node node_modules/.bin/nightwatch"
    }
}
```

## Tools

**@amjs/vue-tools** provides a set-up of tools to use in any VueJS project.

#### VueJS configuration

Just add following line to project's entry point:

```javascript
import '@amjs/vue-tools/config/vue';
```

#### Fetch mock for tests

Just add following line to test file:

```javascript
import '%/tests/utils/fetch';
```

#### VueJS instance renderer for tests

```javascript
// test file
import renderer from '%/tests/utils/renderer';
import MyComponent from 'my-component-path';

// Create a snapshot:
it('Snapshot', async () =>
    expect(await renderer(MyComponent, null, true)).toMatchSnapshot());

// Create instance
it('Instance', async () =>
{
    const props = {
        key: 'value'
    };
    const inst = await renderer(MyComponent, props);
    expect(inst.key).toBe('value');
});
```
