const fs = require('fs-extra');
const path = require('path');
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);

function getCommand(watch) {
  const babel = path.join(process.cwd(), 'node_modules', '.bin', 'babel');
  const args = [
    './src',
    '--out-dir ./dist',
    `--config-file ./.babelrc.js`,
    `--copy-files`,
    `--extensions ".js,.jsx,.ts,.tsx"`,
  ];

  if (watch) {
    args.push('-w');
  }
  return `${babel} ${args.join(' ')}`;
}

async function babelify(watch = false) {
  if (!fs.existsSync('src')) {
    console.log('No src dir for Storybook');
    return;
  }

  console.log('Building Storybook');
  const command = getCommand(watch);
  const { stderr } = await exec(command);
  // log output
  console.log(stderr);
}

function getPackageJson() {
  const modulePath = path.resolve('./');
  return require(path.join(modulePath, 'package.json'));
}

function removeDist() {
  console.log(`Removing Storybook dist`);
  return fs.remove('dist');
}

module.exports = async function buildStorybook() {
  const currentDir = process.cwd();
  // build SB
  process.chdir(path.join(__dirname, '..', 'packages', '@glimmerx', 'storybook'));
  const packageJson = getPackageJson();
  await removeDist();
  await babelify();
  console.log(`Built: ${packageJson.name}@${packageJson.version}`);
  // return to previous dir
  process.chdir(currentDir);
};
