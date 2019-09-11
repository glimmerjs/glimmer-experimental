#!/usr/bin/env node

const path = require('path');
const fs = require('fs-extra');
const { promisify } = require('util');

const exec = promisify(require('child_process').exec);
const glob = promisify(require('glob'));

(async function() {
  process.cwd(path.join(__dirname, '..'));

  try {
    await exec('node_modules/.bin/tsc -p .');
  } catch (err) {
    if (err.stdout) {
      console.log(err.stdout.toString());
    } else {
      throw err;
    }
  }

  const packages = (await glob('dist/packages/{@*/*,!(@*)}'))
    .map(pkg => pkg.replace('dist/packages/', ''))
    .map(pkg => ({
      from: path.join('dist', 'packages', pkg),
      to: path.join('packages', pkg, 'dist'),
    }));

  await remove(packages.map(pkg => pkg.to));
  await move(packages);

  console.log('\n\nDone');
})();

function remove(paths) {
  return each(paths, path => {
    console.log(`Removing ${path}`);
    return fs.remove(path);
  });
}

function move(paths) {
  return each(paths, ({ from, to }) => {
    console.log(`Moving ${from} -> ${to}`);
    return fs.rename(from, to);
  });
}

function each(paths, cb) {
  return Promise.all(paths.map(cb));
}
