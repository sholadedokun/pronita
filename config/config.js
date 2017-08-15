var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'pronitaexpress'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/pronitaexpress-development',
    serect: 'pronitaSecretWithOlushola'
  },

  test: {
    root: rootPath,
    app: {
      name: 'pronitaexpress'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/pronitaexpress-test',
    serect: 'pronitaSecretWithOlushola'
  },

  production: {
    root: rootPath,
    app: {
      name: 'pronitaexpress'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/pronitaexpress-production',
    serect: 'pronitaSecretWithOlushola'
  }
};

module.exports = config[env];
