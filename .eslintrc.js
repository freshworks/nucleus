// eslint-disable-next-line node/no-extraneous-require
const ESLINT_PLUGIN_NODE = require('eslint-plugin-node');

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: [
    'ember'
  ],
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended'
  ],
  env: {
    browser: true
  },
  rules: {
    'ember/no-jquery': 'error'
  },
  overrides: [
    // node files
    {
      files: [
        '.eslintrc.js',
        '.template-lintrc.js',
        'ember-cli-build.js',
        'index.js',
        'testem.js',
        'blueprints/*/index.js',
        'config/**/*.js',
        'tests/dummy/config/**/*.js'
      ],
      excludedFiles: [
        'addon/**',
        'addon-test-support/**',
        'app/**',
        'tests/dummy/app/**'
      ],
      parserOptions: {
        sourceType: 'script',
        "ecmaFeatures": {
          "legacyDecorators": true
        }
      },
      env: {
        browser: false,
        node: true
      },
      plugins: ['node'],
      // eslint-disable-next-line node/no-extraneous-require
      rules: Object.assign({}, ESLINT_PLUGIN_NODE.configs.recommended.rules, {
        'comma-dangle': ['error', 'never'],
        'ember/new-module-imports': 'off',
        'ember/order-in-components': 2,
        'ember/order-in-controllers': 2,
        'ember/order-in-models': 2,
        'ember/order-in-routes': 2,
        'ember/use-ember-get-and-set': [2, {
          ignoreThisExpressions: false
        }],
        'ember/no-jquery': 2,
        'ember/no-restricted-resolver-tests': 0
      })
    }
  ]
};
