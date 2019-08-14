#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');
const { sync: globSync } = require('glob');

process.cwd(path.join(__dirname, '..'));

try {
  execSync('node_modules/.bin/tsc -p .');
} catch (err) {
  console.log(err.output.toString());
}

const packages = globSync('dist/packages/{@*/*,!(@*)}')
  .map(pkg => pkg.replace('dist/packages/', ''));

packages.forEach(pkg => {
  fs.renameSync(path.join('dist/packages', pkg), path.join('packages', pkg, 'dist'));
});