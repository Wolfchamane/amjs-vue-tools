# @amjs/vue-tools

![version](https://img.shields.io/npm/v/@amjs/vue-tools?style=flat-square)

Provides development tools for VueJS based projects with Webpack and JEST.

What's included?

- Peer dependencies of `Vue^2` and `vue-router` compatible version.
- Configurations for development and production compilation with `Webpack^5`.
- Configuration for running unitary tests with `Jest`.
- Configuration for running source linting with `Eslint` and `StyleLint`.
- Transpilation of `ES6+` with `BabelJS`.
- Transpilation of `*.sass` with `DartSass`.
- Transpilation of `*.pug` with `Pug/Jade`.

## Installation

```bash
$ npm i --save @amjs/vue-tools
```

Also install `peerDependencies`:

```bash
$ npm i --save vue vue-router
```

## Usage

Add following scripts to `package.json` file:

```json
{
    "scripts": {
        "dev": "NODE_ENV=dev node node_modules/@amjs/vue-tools/scripts/serve.js",
        "build": "NODE_ENV=pro node node_modules/@amjs/vue-tools/scripts/build.js",
        "test": "NODE_ENV=test node node_modules/@amjs/vue-tools/scripts/test.js",
        "format": "prettier --config node_modules/@amjs/vue-tools/.prettierrc --write 'src/**/*.js'",
        "lint:css": "sass-lint --config node_modules/@amjs/vue-tools/.sass-lint.yml -v",
        "lint:js": "eslint --fix --config node_modules/@amjs/vue-tools/.eslintrc.yml --ext .js src tests",
        "lint": "node node_modules/@amjs/vue-tools/scripts/lint.js",
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
import renderer    from '%/tests/utils/renderer';
import MyComponent from 'my-component-path';

// Create a snapshot:
it('Snapshot', async () =>
    expect(await renderer(MyComponent, null, true)).toMatchSnapshot());

// Create instance
it('Instance', async () =>
{
    const props = {
        key : 'value'
    };
    const inst = await renderer(MyComponent, props);
    expect(inst.key).toBe('value');
});
```

## Extending configuration

Every `Webpack` plugin/loader used in this bundle is extendable, meaning that you can add your own plugin/loader
project specific configuration.

Those are the plugin/loader used by this tool:

```bash
.
├── plugins
│   ├── bundle-analyzer.js
│   ├── copy.js
│   ├── define.js
│   ├── eslint.js
│   ├── friendly-errors.js
│   ├── hashed-module-id.js
│   ├── hmr.js
│   ├── html.js
│   ├── mini-css.js
│   ├── no-emit-on-errors.js
│   ├── optimize-css.js
│   ├── ora.js
│   ├── stylelint.js
│   ├── terser.js
│   └── vue.js
└── rules
    ├── babel.js
    ├── eslint.js
    ├── pug.js
    ├── sass.js
    ├── url.js
    └── vue.js
```

Just re-create the plugin/loader you want to override in your project under `config/webpack/` folder.

### Examples

#### Defining HTML title

```javascript
// project/config/webpack/plugins/html.js

// load tool default plugin
const plugin = require('@amjs/vue-tools/config/webpack/plugins/html');

// define project's HTML variables
const title  = 'My awesome project!';

// return function wrapping plugin call with options
module.exports = () => plugin({ title });
```

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <title><?= htmlWebpackPlugin.options.title =></title>
    </head>
</html>
```

[More info](https://webpack.js.org/plugins/html-webpack-plugin/)

#### Defining global JS variables

```javascript
// project/config/webpack/plugins/define.js

// load tool default plugin
const plugin = require('@amjs/vue-tools/config/webpack/plugins/define');

// define project's global JS variables
const HOSTNAME  = 'https://some-url:port/api/';

// return function wrapping plugin call with options
module.exports = () => plugin({ HOSTNAME });
```

```javascript
// project/src/api-manager.js
/* global HOSTNAME */

class ApiManager
{
    request(url = '')
    {
        return fetch(`${HOSTNAME}${url}`);
    }
}
```

[More info](https://webpack.js.org/plugins/define-plugin/)

## Inverse Proxy Server for development

Let's state you want to add an inverse proxy server at development stage,
i.e. [AE Parrot](https://github.com/americanexpress/parrot) for mocking API.

In this case you need to follow [Webpack DevServer Proxy Configuration](https://webpack.js.org/configuration/dev-server/#devserverproxy)
and add the CLI argument `--@amjs-vue-tool-PROXY` to project's npm dev script.
