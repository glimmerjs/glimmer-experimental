'use strict';

let isCI = !!process.env.CI;

let config = {
  framework: 'qunit',
  test_page: 'tests.html',
  launchers: {
    Node: {
      command: 'node_modules/.bin/qunit dist/nodeTests.bundle.js',
      protocol: 'tap'
    }
  },
  watch_files: [
    'dist/tests.bundle.js',
    'dist/nodeTests.bundle.js'
  ],
  on_start: !isCI && {
    command: 'webpack --watch',
    wait_for_text: 'Built at:'
  },
  browser_args: {
    Chrome: {
      mode: 'ci',
      args: [
        // --no-sandbox is needed when running Chrome inside a container
        isCI ? '--no-sandbox' : null,
        '--headless',
        '--remote-debugging-port=0'
      ],
    },
  },
  launch_in_dev: ['Node', 'Chrome'],
  launch_in_ci: ['Node', 'Chrome', 'Firefox'],
};

if (isCI) {
  config.tap_quiet_logs = true;
}

module.exports = config;