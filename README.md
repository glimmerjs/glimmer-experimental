<h1>GlimmerX</h1>

**🚨This is unstable, experimental code and should not be used in production.🚨**

## Quickstart

Generate a new project using the GlimmerX blueprint:

```sh
npx ember-cli new hello-glimmerx --blueprint @glimmerx/blueprint
```

## Introduction

This project exists as a playground to explore lightweight APIs for authoring
and rendering portable Glimmer components in any web application. The intent
of these explorations is to eventually incorporate learnings back into Ember
and Glimmer.

Components are defined as classes with an inline template:

```js
// src/MyComponent.js
import Component from '@glimmerx/component';
import Button from './Button';

export default class MyComponent extends Component {
  static template = hbs`
      <h1>Hello world!</h1>
      <Button @title="Click me" />
    `;
}
```

As shown here with `Button`, child components can be imported with standard
JavaScript syntax.

To render a component, use the `renderComponent` function:

```js
// src/app.js
import { renderComponent } from '@glimmerx/core';
import MyComponent from './MyComponent';

renderComponent(MyComponent, document.getElementById('app'));
```

## Installation

Install the `@glimmerx/core` and `@glimmerx/component` packages via Yarn or
npm:

```
yarn add @glimmerx/core @glimmerx/component
```

You will also need to install a Babel plugin that compiles templates with the
Glimmer compiler:

```
yarn add -D @glimmerx/babel-plugin-component-templates
```

If using ESLint, you will also want to install / use the plugin provided, as the `no-unused-vars` core rule will fail without it

```
yarn add -D @glimmerx/eslint-plugin
```

For setup/configuration of the plugin, please view the [Plugin Readme](packages/@glimmerx/eslint-plugin)

## API

### `@glimmerx/component`

#### `Component`

`import Component from '@glimmerx/component'`

The Glimmer component base class. Does not have any interesting API to speak
of itself.

#### `hbs`

`import { hbs } from '@glimmerx/component'`

A tagged template function used to specify component templates. The `hbs`
template must be assigned to a static class field called `template` in order
to be valid.

```js
import Component, { hbs } from '@glimmerx/component';
export default class extends Component {
  static template = hbs`
      <button>Click me</button>
    `;
}
```

This example **does not** work:

```js
import Component, { hbs } from '@glimmerx/component';
export default class extends Component {
  // Doesn't work!
  //   * Property is not called `template`
  //   * Property is not static
  myTemplate = hbs`
      <button>Click me</button>
    `;
}
```

#### `tracked`

`import { tracked } from '@glimmerx/component'`

Decorator that marks a class property as tracked. For more information, see
[Change Tracking with Tracked Properties](https://guides.emberjs.com/release/in-depth-topics/autotracking-in-depth/).

```js
import Component, { hbs, tracked } from '@glimmerx/component';
export default class extends Component {
  static template = hbs`{{this.count}}`;

  @tracked count = 0;

  constructor() {
    super(...arguments);
    setInterval(() => {
      this.count++;
    }, 1000);
  }
}
```

### `@glimmerx/helper`

#### `helper`

Wrapper function to tag functions as helpers

`import { helper } from @glimmerx/helper`

```js
import Component, { hbs } from '@glimmerx/component';
import { helper } from '@glimmerx/helper';

const myHelper = helper(([name], { greeting }) => {
  return `${greeting} ${name}`;
});

export default class extends Component {
  static template = hbs`
      {{myHelper "foo" greeting="Hello"}}
    `;
}
```

### `@glimmerx/service`

#### `service`

`import { service } from '@glimmerx/service';`

Decorator to inject services into a component.

```js
import Component, { hbs } from '@glimmerx/component';
import { service } from '@glimmerx/service';
export default class extends Component {
  static template = hbs`
        {{this.currentLocale}}
      `;
  @service locale;
  get currentLocale() {
    return this.locale.currentLocale;
  }
}
```

### `@glimmerx/modifier`

#### `on`

`import { on } from '@glimmerx/modifier'`

On modifier that allows components to add listeners for an dom event on an element

```js
import Component, { hbs } from '@glimmerx/component';
import { on } from '@glimmerx/modifier';
export default class extends Component {
  static template = hbs`
        <button {{on "click" this.buttonClicked}}>Click Me!</button>
      `;

  buttonClicked() {
    console.log('The Button is clicked');
  }
}
```

#### `action`

`import { action } from '@glimmerx/modifier'`

A decorator to bind a function to a component instance. This is required to set the `this` scope for a passed in function to any modifier.

```js
import Component, { hbs, tracked } from '@glimmerx/component';
import { on, action } from '@glimmerx/modifier';
export default class extends Component {
  static template = hbs`
        <button {{on "click" this.incrementCounter}}>Counter: {{this.count}}</button>
      `;
  @tracked count = 1;

  @action
  incrementCounter() {
    this.count++;
  }
}
```

### `@glimmerx/core`

#### `renderComponent`

`import { renderComponent } from '@glimmerx/core'`

Renders a component into the DOM. The first argument is a Glimmer component
class and the second argument is the target DOM element to render it into.

```js
import { renderComponent } from '@glimmerx/core';
import MyComponent from './MyComponent';

renderComponent(MyComponent, document.getElementById('app'));
```

Renders a component with arguments passed to the component. First argument is the Glimmer Component, the second argument is an object of render options, with the target DOM element and the arguments to pass to the component to render.

```js
import { renderComponent } from '@glimmerx/core';
import Component, { hbs } from '@glimmerx/component';

class OtherComponent extends Component {
  static template = hbs`<h1>{{@say}}</h1>`;
}

renderComponent(MyComponent, {
  element: document.getElementById('app'),
  args: {
    say: 'Hello World',
  },
});
```

Service implementations for injection in components/helpers can be provided when calling renderComponent.

```js
import { renderComponent } from '@glimmerx/core';
import LocaleService from './services/LocaleService';
renderComponent(MyComponent, {
  element: document.getElementById('app'),
  services: {
    locale: new LocaleService('en_US'),
  },
});
```

### `@glimmerx/storybook`

#### `storiesOf`

`import { storiesOf } from '@glimmerx/storybook'`

Integrates Storybook into your host GlimmerJs application.

```js
import { storiesOf } from '@glimmerx/storybook';
import SampleComponent from '../src/SampleComponent';

storiesOf('Sample', module).add('SampleComponent', () => hbs`<SampleComponent />`);
```

For more details refer [README](./packages/@glimmerx/storybook/README.md).

## Experimental Features

### Ember/Glimmer Interop

The `@glimmerx` packages are compatible with both Ember and Glimmer
applications, with some notable caveats:

- Custom helpers are not supported using `helper` from `@glimmerx/helper`
- Plain functions do not work as helpers or modifiers in Ember applications
- Ember applications do not support template imports. As such, even if you
  import a component to use in your app, you must _also_ export that component
  in the resolvable location for Ember apps.

This feature is highly experimental, and it is not recommended to build
production applications or addons using it currently. You can see an example of
this feature in use in the `examples/basic-addon` Ember addon, which can be used
in both Ember and Glimmer applications.

## Development

### Setup

`yarn install`

### Example Application

For inspiration, see [the example application source code](packages/example-app).
To run the sample application, run `yarn start` and visit `http://localhost:8080`.

## Tests

Run once:

`yarn test`

For TDD:

`yarn test:watch`

Tests are run via testem (configured in [testem.json](testem.json)) and built
with webpack (configured in [webpack.config.js](webpack.config.js)).

## Storybook

To test Storybook changes on example app components run:

`yarn storybook` this will auto open Storybook app
