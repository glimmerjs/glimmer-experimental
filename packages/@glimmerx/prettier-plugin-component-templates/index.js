const babelParsers = require('prettier/parser-babel').parsers;
const typescriptParsers = require('prettier/parser-typescript').parsers;

const { esTree } = require('./lib/util');

const {
  builders: { group, indent, softline, hardline },
  utils: { stripTrailingHardline, getDocParts },
} = require('prettier').doc;

const comments = require('./lib/comments');

function startsWithHardline(doc) {
  const [first, second] = getDocParts(doc.contents);
  return first && first.type === 'line' && first.hard && second && second.type === 'break-parent';
}

function formatHbs(path, print, textToDoc, options) {
  const node = path.getValue();
  const text = node.quasis.map((quasi) => quasi.value.raw).join('');

  const isMultiLine = text.startsWith('\n') || node.loc.end.column >= options.printWidth;

  let doc = stripTrailingHardline(
    textToDoc(text, {
      parser: 'glimmer',
      singleQuote: options.hbsSingleQuote,
    })
  );

  if (!isMultiLine) {
    return group(['`', doc, '`']);
  }

  if (startsWithHardline(doc)) {
    return group(['`', indent(group(doc)), softline, '`']);
  }

  return group(['`', indent([hardline, group(doc)]), softline, '`']);
}

function isHbs(path) {
  return path.match(
    (node) => {
      return node.type === 'TemplateLiteral';
    },
    (node, name) => {
      return (
        node.type === 'TaggedTemplateExpression' &&
        node.tag.type === 'Identifier' &&
        node.tag.name === 'hbs' &&
        name === 'quasi'
      );
    }
  );
}

function embed(path, print, textToDoc, options) {
  if (isHbs(path)) {
    const output = formatHbs(path, print, textToDoc, {
      ...options,
      singleQuote: options.hbsSingleQuote,
    });
    return output;
  }

  return esTree(options).embed(path, print, textToDoc, options);
}

function print(path, options, print) {
  return esTree(options).print(path, options, print);
}

const languages = [
  {
    name: 'glimmer-experimental',
    group: 'JavaScript',
    parsers: ['babel', 'babel-ts', 'typescript'], // Which parsers do we want to support?
    extensions: ['.gjs', '.js', '.ts'],
    vscodeLanguageIds: ['javascript'],
  },
];

const parsers = {
  babel: {
    ...babelParsers.babel,
    astFormat: 'esTree',
    parse(text, parsers, options) {
      const ast = babelParsers.babel.parse(text, parsers, options);
      return ast;
    },
  },
  // babel-ts?
  typescript: {
    ...typescriptParsers.typescript,
    astFormat: 'esTree',
    parse(text, parsers, options) {
      const ast = typescriptParsers.typescript.parse(text, parsers, options);
      return ast;
    },
  },
};

const printers = {
  esTree: {
    embed,
    print,
    ...comments,
  },
};

module.exports = {
  languages,
  parsers,
  printers,
  options: {
    hbsSingleQuote: {
      type: 'boolean',
      category: 'Global',
      default: false,
      description: 'Change quote preference in inline hbs files to single quote.',
    },
  },
};
