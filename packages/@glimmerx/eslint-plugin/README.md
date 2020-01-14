# @glimmerx/eslint-plugin

## Background

[ESLint](https://eslint.org/docs/about) is an open source JavaScript [linting](https://en.wikipedia.org/wiki/Lint_\(software\)) utility.

## Introduction

This project exists to provide ESLint rules that either:
- fix issues between inline templates and the core ESLint rules
- Enable enhanced development experience for GlimmerX component authors/maintainers

## Installation and Usage

```
yarn add -D @glimmerx/eslint-plugin
```

For configuration, ESLint generally uses files named `.eslintrc.json` or `.eslintrc.js`.
The examples in this README will use js syntax, but you can read [the configuration docs for ESLint](https://eslint.org/docs/user-guide/configuring) for information on other formats / methods

To enable the Plugin, you will need to add the `@glimmerx` plugin to your list of plugins:
```js
module.exports = {
  plugins: [
    // ...existing plugins, if any
    '@glimmerx'
  ],
  // ...Other configuration settings
}
```

You will also need to enable any rules in the list of rules present in that same configuration. For example, if you wanted to use the rule `@glimmerx/template-vars`:
```js
module.exports = {
  plugins: [
    // ...existing plugins, if any
    '@glimmerx'
  ],
  // ...Other configuration settings
  rules: {
    '@glimmerx/template-vars': 'error'
  }
}
```

For details on what specific rules do and full configuration options, refer to [The Rules Docs](docs/rules)

## Development

For information on developing ESLint rules, see [the ESLint Rule Development Documentation](https://eslint.org/docs/developer-guide/working-with-rules)

### Testing

Testing is done by mocha and (when possible) uses [ESLint's built-in RuleTester](https://eslint.org/docs/developer-guide/nodejs-api#ruletester)
```
yarn test
```
