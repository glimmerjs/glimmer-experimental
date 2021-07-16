# @glimmerx/prettier-plugin-component-templates

## Background

[Prettier](https://prettier.io/docs/en/index.html) is an opinionated code formatter. In Prettier `>2.0` there is support for `*.hbs` glimmer files, but does not support the experimental syntaxes that `glimmerx` components are authored in.

## Introduction

This plugin extends the internal printers to add an embedded syntax for glimmer template in an `hbs` TaggedTemplateExpressions.

## Installation and Usage

```bash
yarn add -D @glimmerx/prettier-plugin-component-templates
```

Once added prettier will discover and use the plugin to format any `hbs` tagged template expression.

### Options

In your prettier config options (e.g. `.prettierrc`, `prettier.config.js`, etc.)

`.prettierrc`

```json
{
  "hbsSingleQuote": true
}
```

Defaults to `false` forcing double-quotes for all attributes in an hbs embed. When `true` will rewrite all quotes to single-quotes.

## Development

Generate a test case, add it to the tests file,

Add `PRETTIER_DEBUG=true` to the environment when running the plugin in order to get complete stack traces on errors.

### Debugging

#### Debugging

```
PRETTIER_DEBUG=true node --inspect-brk  node_modules/.bin/prettier --config=./test/fixtures/basic/config.js ./test/fixtures/basic/code.js
```

### Generate a snapshot

```
node node_modules/.bin/prettier --ignore-path --config=./test/fixtures/simple-formatted/config.js ./test/fixtures/simple-formatted/code.js > ./test/fixtures/simple-formatted/output.js
```

### Testing

#### Run all tests

```
yarn test
```

## TODO

- [ ] Add support for `<template>` tag semantics.
