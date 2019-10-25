'use strict';

const getChannelURL = require('ember-source-channel-url');

module.exports = async function() {
  return {
    useYarn: true,
    useWorkspaces: true,
    command: 'yarn test',
    scenarios: [
      {	
        name: 'ember-lts-2.18',	
        env: {	
          EMBER_OPTIONAL_FEATURES: JSON.stringify({ 'jquery-integration': true })	
        },	
        npm: {	
          devDependencies: {	
            '@ember/jquery': '^0.5.1',	
            'ember-source': '~2.18.0'	
          }	
        }
      },
      {
        name: 'ember-lts-3.4',
        npm: {
          devDependencies: {
            'ember-source': '~3.4.0'
          }
        }
      },
      {
        name: 'ember-lts-3.8',
        npm: {
          devDependencies: {
            'ember-source': '~3.8.0'
          }
        }
      },
      {
        name: 'ember-release',
        npm: {
          devDependencies: {
            'ember-source': await getChannelURL('release')
          }
        }
      },
      {
        name: 'ember-canary',
        npm: {
          devDependencies: {
            'ember-source': await getChannelURL('canary')
          }
        }
      },
      {
        name: 'ember-default-with-jquery',
        env: {
          EMBER_OPTIONAL_FEATURES: JSON.stringify({
            'jquery-integration': true
          })
        },
        npm: {
          devDependencies: {
            '@ember/jquery': '^0.5.1'
          }
        }
      }
    ]
  };
};
