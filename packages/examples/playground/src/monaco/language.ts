/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

'use strict';

import * as monaco from 'monaco-editor';
import { conf, language } from 'monaco-languages/release/esm/javascript/javascript';

monaco.languages.register({ id: 'glimmer' });

///////////

// JavaScript Highlighting

// fix decorator highlighting
language.symbols = /[=><!~?:&|+\-*/^%@]+/;

// constants
language.tokenizer.common.unshift([/true|false|undefined|null/, 'constant']);

// new identifier
language.tokenizer.common.unshift(['new', 'keyword', '@new']);
language.tokenizer.new = [[/[a-zA-Z_$][\w$]*/, 'type.identifier', '@pop']];

// functions
language.tokenizer.common.unshift([/[a-zA-Z_$][\w$]*(?=\()/, 'function']);
language.tokenizer.common.unshift(['function', 'keyword', '@function']);
language.tokenizer.function = [[/[a-z_$][\w$]*/, 'function', '@pop']];

// template tags
language.tokenizer.common.unshift([/[a-zA-Z_$][\w$]*(?=`)/, 'function']);

///////////

// Handlebars Embedding

language.tokenizer.common.unshift([
  /(hbs)(`)/,
  [
    'function',
    {
      token: 'string',
      bracket: '@open',
      next: '@embeddedHandlebars',
      nextEmbedded: 'handlebars',
    },
  ],
]);

language.tokenizer.embeddedHandlebars = [
  ['`', { token: 'string', bracket: '@close', next: '@pop', nextEmbedded: '@pop' }],
];

///////////

monaco.languages.setLanguageConfiguration('glimmer', conf);
monaco.languages.setMonarchTokensProvider('glimmer', language);
