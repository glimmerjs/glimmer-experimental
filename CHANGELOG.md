## v0.2.4 (2020-10-01)

#### :bug: Bug Fix
* `@glimmerx/blueprint`
  * [#84](https://github.com/glimmerjs/glimmer-experimental/pull/84) Update blueprints ([@chadhietala](https://github.com/chadhietala))
* `@glimmerx/eslint-plugin`
  * [#76](https://github.com/glimmerjs/glimmer-experimental/pull/76) Update ESLint plugin to handle Handlebar's native #with token ([@erinsinger93](https://github.com/erinsinger93))

#### :memo: Documentation
* [#85](https://github.com/glimmerjs/glimmer-experimental/pull/85) Update change tracking reference ([@chadhietala](https://github.com/chadhietala))

#### :house: Internal
* [#73](https://github.com/glimmerjs/glimmer-experimental/pull/73) Add hook for release-it to run build before releasing ([@chiragpat](https://github.com/chiragpat))

#### Committers: 3
- Chad Hietala ([@chadhietala](https://github.com/chadhietala))
- Chirag Patel ([@chiragpat](https://github.com/chiragpat))
- Erin Singer ([@erinsinger93](https://github.com/erinsinger93))


## v0.2.3 (2020-05-18)

#### :house: Internal
* `examples`
  * [#71](https://github.com/glimmerjs/glimmer-experimental/pull/71) [CHORE] add private: true field to basic-addon ([@chiragpat](https://github.com/chiragpat))

#### Committers: 1
- Chirag Patel ([@chiragpat](https://github.com/chiragpat))


## v0.2.2 (2020-04-20)

#### :house: Internal
* `@glimmerx/babel-plugin-component-templates`, `@glimmerx/blueprint`, `@glimmerx/component`, `@glimmerx/core`, `@glimmerx/helper`, `@glimmerx/modifier`, `@glimmerx/ssr`, `@glimmerx/storybook`, `examples`
  * [#70](https://github.com/glimmerjs/glimmer-experimental/pull/70) [CHORE] Bump to glimmerjs 2.0.0-beta.7 which contains glimmer-vm 0.51.0 ([@chiragpat](https://github.com/chiragpat))

#### Committers: 1
- Chirag Patel ([@chiragpat](https://github.com/chiragpat))


## v0.2.1 (2020-04-17)

#### :bug: Bug Fix
* `@glimmerx/babel-plugin-component-templates`, `@glimmerx/blueprint`, `@glimmerx/component`, `@glimmerx/core`, `@glimmerx/helper`, `@glimmerx/modifier`, `@glimmerx/ssr`, `@glimmerx/storybook`, `examples`
  * [#69](https://github.com/glimmerjs/glimmer-experimental/pull/69) [BUGFIX] Fixes interop with Commonjs ([@pzuraq](https://github.com/pzuraq))

#### Committers: 1
- Chris Garrett ([@pzuraq](https://github.com/pzuraq))

## v0.2.0 (2020-04-10)

Updates to Glimmer.js 2.0!

#### :boom: Breaking Change
* `@glimmerx/babel-plugin-component-templates`, `@glimmerx/component`, `@glimmerx/core`, `@glimmerx/helper`, `@glimmerx/modifier`, `@glimmerx/ssr`, `@glimmerx/storybook`
  * [#55](https://github.com/glimmerjs/glimmer-experimental/pull/55) [BUGFIX] Updates to latest beta and new setComponentTemplate ([@pzuraq](https://github.com/pzuraq))
* `@glimmerx/babel-plugin-component-templates`, `@glimmerx/component`, `@glimmerx/core`, `@glimmerx/helper`, `@glimmerx/modifier`, `@glimmerx/service`, `@glimmerx/ssr`, `@glimmerx/storybook`, `example-app`
  * [#51](https://github.com/glimmerjs/glimmer-experimental/pull/51) [FEAT][BREAKING] Upgrade to Glimmer.js 2.0 ([@pzuraq](https://github.com/pzuraq))

#### :rocket: Enhancement
* `@glimmerx/babel-plugin-component-templates`, `@glimmerx/component`, `@glimmerx/helper`, `@glimmerx/modifier`, `@glimmerx/service`, `examples`
  * [#58](https://github.com/glimmerjs/glimmer-experimental/pull/58) [FEATURE] Ember/Glimmer interop ([@pzuraq](https://github.com/pzuraq))
* `@glimmerx/blueprint`
  * [#60](https://github.com/glimmerjs/glimmer-experimental/pull/60) [FEATURE] Adds app blueprint ([@pzuraq](https://github.com/pzuraq))
* `@glimmerx/babel-plugin-component-templates`, `@glimmerx/core`, `@glimmerx/eslint-plugin`, `@glimmerx/helper`, `@glimmerx/ssr`, `@glimmerx/storybook`, `examples`
  * [#62](https://github.com/glimmerjs/glimmer-experimental/pull/62) Update dependencies / devDependencies to latest versions. ([@rwjblue](https://github.com/rwjblue))

#### :bug: Bug Fix
* `examples`
  * [#64](https://github.com/glimmerjs/glimmer-experimental/pull/64) [BUGFIX] Fix Playground asset urls ([@pzuraq](https://github.com/pzuraq))
* `@glimmerx/core`, `@glimmerx/ssr`, `examples`
  * [#57](https://github.com/glimmerjs/glimmer-experimental/pull/57) [BUGFIX] Fix setComponentTemplate in tests ([@pzuraq](https://github.com/pzuraq))
* `@glimmerx/babel-plugin-component-templates`
  * [#53](https://github.com/glimmerjs/glimmer-experimental/pull/53) [BUGFIX] Fix Babel transform interactions with other transforms ([@pzuraq](https://github.com/pzuraq))

#### :memo: Documentation
* `@glimmerx/babel-plugin-component-templates`, `@glimmerx/component`, `@glimmerx/core`, `@glimmerx/eslint-plugin`, `@glimmerx/helper`, `@glimmerx/modifier`, `@glimmerx/service`, `@glimmerx/ssr`, `examples`
  * [#61](https://github.com/glimmerjs/glimmer-experimental/pull/61) Update repository references in `package.json`s. ([@rwjblue](https://github.com/rwjblue))

#### :house: Internal
* `@glimmerx/babel-plugin-component-templates`, `@glimmerx/blueprint`, `@glimmerx/component`, `@glimmerx/core`, `@glimmerx/helper`, `@glimmerx/modifier`, `@glimmerx/ssr`, `@glimmerx/storybook`, `examples`
  * [#68](https://github.com/glimmerjs/glimmer-experimental/pull/68) Pin Glimmer.js beta version ([@pzuraq](https://github.com/pzuraq))
* Other
  * [#67](https://github.com/glimmerjs/glimmer-experimental/pull/67) Update the README for v0.2 ([@pzuraq](https://github.com/pzuraq))
  * [#66](https://github.com/glimmerjs/glimmer-experimental/pull/66) [FEAT] Add release-it ([@pzuraq](https://github.com/pzuraq))
* `@glimmerx/babel-plugin-component-templates`, `@glimmerx/core`, `@glimmerx/eslint-plugin`, `@glimmerx/helper`, `@glimmerx/modifier`, `@glimmerx/service`, `@glimmerx/ssr`
  * [#65](https://github.com/glimmerjs/glimmer-experimental/pull/65) Add "files" to package.json to be restrict what is published ([@josemarluedke](https://github.com/josemarluedke))
* `examples`
  * [#63](https://github.com/glimmerjs/glimmer-experimental/pull/63) [FEATURE] Adds Playground  ([@pzuraq](https://github.com/pzuraq))
  * [#56](https://github.com/glimmerjs/glimmer-experimental/pull/56) [INTERNAL] Adds a new example addon and app ([@pzuraq](https://github.com/pzuraq))
* `@glimmerx/babel-plugin-component-templates`, `@glimmerx/core`, `@glimmerx/eslint-plugin`, `@glimmerx/ssr`, `examples`
  * [#59](https://github.com/glimmerjs/glimmer-experimental/pull/59) [CHORE] Updates Prettier to v2 ([@pzuraq](https://github.com/pzuraq))
* `@glimmerx/component`, `@glimmerx/core`, `@glimmerx/eslint-plugin`, `@glimmerx/helper`, `@glimmerx/ssr`, `@glimmerx/storybook`, `example-app`, `examples`
  * [#54](https://github.com/glimmerjs/glimmer-experimental/pull/54)  [REFACTOR] Better build and linting ([@pzuraq](https://github.com/pzuraq))
* `@glimmerx/babel-plugin-component-templates`, `@glimmerx/component`, `@glimmerx/core`, `@glimmerx/eslint-plugin`, `@glimmerx/helper`, `@glimmerx/modifier`, `@glimmerx/service`, `@glimmerx/ssr`, `@glimmerx/storybook`, `example-app`
  * [#52](https://github.com/glimmerjs/glimmer-experimental/pull/52) Add CI checks using Github Actions ([@chiragpat](https://github.com/chiragpat))

#### Committers: 4
- Chirag Patel ([@chiragpat](https://github.com/chiragpat))
- Chris Garrett ([@pzuraq](https://github.com/pzuraq))
- Josemar Luedke ([@josemarluedke](https://github.com/josemarluedke))
- Robert Jackson ([@rwjblue](https://github.com/rwjblue))


