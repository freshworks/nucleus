/* eslint-env node */
'use strict';

module.exports = {
  extends: 'recommended',

  rules: {
    'no-bare-strings': true,
    'quotes': 'double',
    'no-invalid-interactive': false
  },
  ignore: [
    '**/tests/dummy/**'
  ]
};
