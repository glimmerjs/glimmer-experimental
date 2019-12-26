/* globals describe it */
const babelParser = require.resolve('babel-eslint');
const rule = require('../../../lib/rules/template-vars');
// This very unfortunate require is because of the way RuleTester is set up.
// It will test only the rule name provided, and error out if any other rule fails.
// const unusedRule = require('../../../node_modules/eslint/lib/rules/no-unused-vars');
const { Linter, RuleTester } = require('eslint');
const assert = require('assert');

const ruleTester = new RuleTester({
  parser: babelParser,
  rules: {
    'template-vars': 'error',
  },
});

/**
 * Returns an expected error for defined-but-not-used variables.
 * @param {string} varName The name of the variable
 * @returns {string} An expected error message
 */
function definedError(varName) {
  return `'${varName}' is defined but never used.`;
}

const linter = new Linter();
// We need to define the rule here so that it is present for the run below
linter.defineRule('template-vars', rule);
linter.defineParser('babel-eslint', require('babel-eslint'));

function testUnusedVars(code) {
  return linter.verify(code, {
    parser: 'babel-eslint',
    rules: {
      'no-unused-vars': 2,
      'template-vars': 2,
    },
  });
}

describe('no-unused-vars', function() {
  // eslint-disable-next-line no-invalid-this
  this.timeout(5000);

  it('should not contain any errors when hbs is present and all references are imported', () => {
    const lintedOutput = testUnusedVars(`
      import { hbs } from '@glimmerx/component';
      import myHelper from './my-helper';
      import MyOtherComponent from './MyOtherComponent';
      export default class Component {
        static template = hbs\`<MyOtherComponent>{{myHelper}}</MyOtherComponent>\`;
        method() {
          return false;
        }
      }
    `);
    assert(lintedOutput.length === 0);
  });
  it('should not contain any errors when hbs is present (but aliased) and all references are imported', () => {
    const lintedOutput = testUnusedVars(`
      import { hbs as notHbs } from '@glimmerx/component';
      import myHelper from './my-helper';
      import MyOtherComponent from './MyOtherComponent';
      export default class Component {
        static template = notHbs\`<MyOtherComponent>{{myHelper}}</MyOtherComponent>\`;
        method() {
          return false;
        }
      }
    `);
    assert(lintedOutput.length === 0);
  });
  it('should throw errors when no hbs import present', () => {
    const lintedOutput = testUnusedVars(`
      import myHelper from './myHelper';
      export default class Component {
        static template = hbs\`I am using {{myHelper}} here, but I forgot to include the hbs import.\`;
        method() {
          return false;
        }
      }
    `);
    assert(lintedOutput.length === 1);
    assert(lintedOutput[0].message === definedError('myHelper'));
  });
  it('should throw errors when unused import present', () => {
    const lintedOutput = testUnusedVars(`
      import { hbs } from '@glimmerx/component';
      import myHelper from './myHelper';
      export default class Component {
        static template = hbs\`Just some text.
          I was using myHelper, but removed it and forgot to remove the import\`;
        method() {
          return false;
        }
      }
    `);
    assert(lintedOutput.length === 1);
    assert(lintedOutput[0].message === definedError('myHelper'));
  });
  it('should throw errors when template literal is not tagged with hbs', () => {
    const lintedOutput = testUnusedVars(`
      import { hbs } from '@glimmerx/component';
      import myHelper from './myHelper';
      export default class Component {
        static template = \`I am using {{myHelper}} here, but I forgot to tag this template literal with hbs.\`;
        method() {
          return false;
        }
      }
    `);
    assert(lintedOutput.length === 2);
    assert(lintedOutput[0].message === definedError('hbs'));
    assert(lintedOutput[1].message === definedError('myHelper'));
  });
  it('should throw errors when template literal is not tagged with hbs and hbs is not imported', () => {
    const lintedOutput = testUnusedVars(`
      import myHelper from './myHelper';
      export default class Component {
        static template = \`I am using {{myHelper}} here, but I forgot to import hbs,
          and also forgot to tag this template literal with hbs.\`;
        method() {
          return false;
        }
      }
    `);
    assert(lintedOutput.length === 1);
    assert(lintedOutput[0].message === definedError('myHelper'));
  });
  it('should throw errors when hbs is imported with an alias and alias is not used', () => {
    const lintedOutput = testUnusedVars(`
      import { hbs as notHbs } from '@glimmerx/component';
      import myHelper from './myHelper';
      export default class Component {
        static template = hbs\`I am using {{myHelper}} here, but I forgot to import hbs,
          and also forgot to tag this template literal with hbs.\`;
        method() {
          return false;
        }
      }
    `);
    assert(lintedOutput.length === 2);
    assert(lintedOutput[0].message === definedError('notHbs'));
    assert(lintedOutput[1].message === definedError('myHelper'));
  });
});

ruleTester.run('template-vars', rule, {
  valid: [
    {
      code: `
        import { hbs } from '@glimmerx/component';
        import myHelper from './my-helper';
        import MyOtherComponent from './MyOtherComponent';
        export default class Component {
          static template = hbs\`<MyOtherComponent>{{myHelper}}</MyOtherComponent>\`;
          method() {
            return false;
          }
        }
      `,
    },
    {
      code: `
        import { hbs } from '@glimmerx/component';
        import myHelper from './my-helper';
        import MyOtherComponent from './MyOtherComponent';
        export default class Component {
          static template = hbs\`
            <MyOtherComponent>
              <:namedBlock>
                {{#unless (has-block "namedBlock")}}
                  {{myHelper}}
                {{/unless}}
              </:namedBlock>
              <:secondNamedBlock>
                {{yield}}
              </:secondNamedBlock>
            </MyOtherComponent>
          \`;
          method() {
            return false;
          }
        }
      `,
    },
    {
      code: `
        import { hbs } from '@glimmerx/component';
        export default class Component {
          static template = hbs\`
            {{#if}}
              If check should not cause a failure
            {{/if}}
            {{#each @items key="@index" as |item| }}
              Neither Should each
            {{/each}}
          \`;
          method() {
            return false;
          }
        }
      `,
    },
    {
      code: `
        import { hbs } from '@glimmerx/component';
        export default class Component {
          static template = hbs\`
            {{#if}}
              If check should not cause a failure
            {{/if}}
            {{#each @items key="@index" as |item| }}
              Neither Should each
            {{/each}}
            {{myImplicitRef}} should not cause a failure either, because it is included in options[1].nativeTokens
          \`;
          method() {
            return false;
          }
        }
      `,
      options: [
        'all',
        {
          nativeTokens: ['myImplicitRef'],
        },
      ],
    },
    {
      code: `
        import { hbs } from '@glimmerx/component';
        export default class Component {
          static template = hbs\`
            {{#if}}
              If check should not cause a failure
            {{/if}}
            {{#each @items key="@index" as |item| }}
              Neither Should each
            {{/each}}
            {{myMissingRef}} should not cause a failure either, because mode is set to 'unused-only'
          \`;
          method() {
            return false;
          }
        }
      `,
      options: ['unused-only'],
    },
  ],
  invalid: [
    {
      code: `
        import { hbs } from '@glimmerx/component';
        export default class Component {
          static template = hbs\`I am using {{myHelper}} here, but I forgot to tag this template literal with hbs.\`;
          method() {
            return false;
          }
          test = true;
        }
      `,
      errors: [
        {
          messageId: 'undefToken',
        },
      ],
      options: ['all'],
    },
  ],
});
