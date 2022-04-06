const { preprocess, traverse } = require('@glimmer/syntax');

/**
 * Adds tokens to the tokensSet if they're a path prefixed with `this.`
 */

function addTokens(tokensSet, node) {
  if (node.type === 'PathExpression') {
    if (node.this === true) {
      // this will only look at the first level of methods on this, with no handling for (properties/methods) of methods
      const topLevelMaybeToken = node.parts[0];

      if (tokensSet.has(topLevelMaybeToken) === false) {
        tokensSet.add(topLevelMaybeToken);
      }
    }
  }
}

/**
 * Parses and traverses a given handlebars html template to extract all references to local methods via `this.myMethod`
 */

export default function getThisTemplateLocals(html) {
  const ast = preprocess(html);
  const tokensSet = new Set();
  traverse(ast, {
    ElementNode(node) {
      addTokens(tokensSet, node);
    },

    PathExpression(node) {
      addTokens(tokensSet, node);
    }
  });
  let tokens = [];
  tokensSet.forEach(s => tokens.push(s));

  return tokens;
}