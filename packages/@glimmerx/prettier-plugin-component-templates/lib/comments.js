const { esTree } = require('./util');

function canAttachComment(node) {
  return (
    node.type &&
    !isBlockComment(node) &&
    !isLineComment(node) &&
    node.type !== 'EmptyStatement' &&
    node.type !== 'TemplateElement' &&
    node.type !== 'Import' &&
    // `babel-ts` don't have similar node for `class Foo { bar() /* bat */; }`
    node.type !== 'TSEmptyBodyFunctionExpression'
  );
}

function isBlockComment(comment) {
  return (
    comment.type === 'Block' ||
    comment.type === 'CommentBlock' ||
    // `meriyah`
    comment.type === 'MultiLine'
  );
}

function isLineComment(comment) {
  return (
    comment.type === 'Line' ||
    comment.type === 'CommentLine' ||
    // `meriyah` has `SingleLine`, `HashbangComment`, `HTMLOpen`, and `HTMLClose`
    comment.type === 'SingleLine' ||
    comment.type === 'HashbangComment' ||
    comment.type === 'HTMLOpen' ||
    comment.type === 'HTMLClose'
  );
}

function printComment(path, options) {
  return esTree(options).printComment(path, options);
}

const handleComments = {
  avoidAstMutation: true,
  ownLine: function (context) {
    const options = context.options;
    return esTree(options).handleComments.ownLine(context);
  },
  endOfLine: function (context) {
    const options = context.options;
    return esTree(options).handleComments.endOfLine(context);
  },
  remaining: function (context) {
    const options = context.options;
    return esTree(options).handleComments.remaining(context);
  },
};

function getCommentChildNodes(node, options) {
  return esTree(options).getCommentChildNodes(node, options);
}

function massageAstNode(node, options) {
  return esTree(options).massageAstNode(node, options);
}

function willPrintOwnComments(path, options) {
  return esTree(options).willPrintOwnComments(path, options);
}

module.exports = {
  canAttachComment,
  handleComments,
  isBlockComment,
  getCommentChildNodes,
  massageAstNode,
  willPrintOwnComments,
  printComment,
};
