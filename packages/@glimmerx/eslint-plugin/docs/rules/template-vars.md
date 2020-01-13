# Disallow Unused / Undef Template Vars (@glimmerx/template-vars)

The presence of Hbs TemplateLiterals in Javascript code presents a scenario where variables that would otherwise be unused may be used inside of the template literal.
It also creates the inverse issue where Components/Helpers may be referenced inside of that TemplateLiteral without being correctly defined.

## Rule Details

This rule has two parts:
- Prevent Component / Helpers imported and used only inside of an Hbs TemplateLiteral from triggering [ESLint's Core no-unused-vars rule](https://eslint.org/docs/rules/no-unused-vars)
- Cause an ESLint validation error if a Component/Helper is used inside of the TemplateLiteral, but is not defined in scope

In order to prevent unintended side-effects on code that is not intended to be read as a GlimmerX Component, the Rules provided only operate on an TemplateLiteral if:
- The file is importing `hbs` from `@glimmerx/component` (ex: `import {hbs} from '@glimmerx/component'`)
AND
- The TemplateLiteral is tagged with the local name of that import. Ex:

```js
import {hbs} from '@glimmerx/component';

const template = hbs`Some HBS Code Here`;
```

OR

```js
import {hbs as hbsLocalName} from '@glimmerx/component';

const template = hbsLocalName`Some HBS Code Here`;
```

### Examples of **incorrect** code for this rule:

The following examples will cause ESLint's core `no-unused-vars` to fail:

```js
import myHelper from './myHelper';

export default class Component {
  static template = hbs`I am using {{myHelper}} here, but I forgot to include the hbs import.`;
  method() {
    return false;
  }
}
```

```js
import { hbs } from '@glimmerx/component';
import myHelper from './myHelper';
export default class Component {
  static template = hbs`Just some text.
    I was using myHelper, but removed it and forgot to remove the import`;
  method() {
    return false;
  }
}
```

```js
import { hbs } from '@glimmerx/component';
import myHelper from './myHelper';
export default class Component {
  static template = `I am using {{myHelper}} here, but I forgot to tag this template literal with hbs.`;
  method() {
    return false;
  }
}
```

```js
import myHelper from './myHelper';
export default class Component {
  static template = `I am using {{myHelper}} here, but I forgot to import hbs,
    and also forgot to tag this template literal with hbs.`;
  method() {
    return false;
  }
}
```

```js
import { hbs as notHbs } from '@glimmerx/component';
import myHelper from './myHelper';
export default class Component {
  static template = hbs`I am using {{myHelper}} here, but I forgot to import hbs,
    and also forgot to tag this template literal with hbs.`;
  method() {
    return false;
  }
}
```

The following example will cause a failure for the rule `@glimmerx/template-vars`, because it usees vars in TemplateLiterals that are not declared in scope

```js
import { hbs } from '@glimmerx/component';
export default class Component {
  static template = hbs`I am using {{myHelper}} here, but I forgot to tag this template literal with hbs.`;
  method() {
    return false;
  }
}
```

### Examples of **correct** code for this rule

```js
import { hbs } from '@glimmerx/component';
import myHelper from './my-helper';
import MyOtherComponent from './MyOtherComponent';
export default class Component {
  static template = hbs`<MyOtherComponent>{{myHelper}}</MyOtherComponent>`;
  method() {
    return false;
  }
}
```

```js
import { hbs as notHbs } from '@glimmerx/component';
import myHelper from './my-helper';
import MyOtherComponent from './MyOtherComponent';
export default class Component {
  static template = notHbs`<MyOtherComponent>{{myHelper}}</MyOtherComponent>`;
  method() {
    return false;
  }
}
```

```js
import { hbs } from '@glimmerx/component';
export default class Component {
  static template = hbs`
    {{#if}}
      If check should not cause a failure
    {{/if}}
    {{#each @items key="@index" as |item| }}
      Neither Should each
    {{/each}}
  `;
  method() {
    return false;
  }
}
```

```js
/*eslint @glimmerx/templatevars: ["error", "all", { "nativeTokens": ["myImplicitRef"]}]*/
import { hbs } from '@glimmerx/component';
export default class Component {
  static template = hbs`
    {{#if}}
      If check should not cause a failure
    {{/if}}
    {{#each @items key="@index" as |item| }}
      Neither Should each
    {{/each}}
    {{myImplicitRef}} should not cause a failure either, because it is included in options[1].nativeTokens
  `;
  method() {
    return false;
  }
}
```

```js
/*eslint @glimmerx/templatevars: ["error", "unused-only"]*/
import { hbs } from '@glimmerx/component';
export default class Component {
  static template = hbs`
    {{#if}}
      If check should not cause a failure
    {{/if}}
    {{#each @items key="@index" as |item| }}
      Neither Should each
    {{/each}}
    {{myMissingRef}} should not cause a failure either, because mode is set to 'unused-only'
  `;
  method() {
    return false;
  }
}
```

## Configuration

This rule takes two arguments:

### mode
Type: `string`
Either `'all'` or `'unused-only'` (default: `'all'`). Setting this to `'unused-only'` will prevent the Linter from detecting/flagging usage in TemplateLiterals that are not present in the scope.

Example:
```js
module.exports = {
  //...
  rules: {
    // ...
    '@glimmerx/template-vars': ['error', 'unused-only']
  }
}
```

### options
Type: `object`
`options` has the following fields:
- `nativeTokens` - 'if' and 'each' will always be treated as 'nativeTokens', but you may want to configure this. One use-case is if a token is added to the Javascript code implicitly (such as via a babel transform)

Example:
```js
module.exports = {
  //...
  rules: {
    // ...
  '@glimmerx/template-vars': ['error', 'all', { nativeTokens: ['myImplicitToken']}]
  }
}
```
