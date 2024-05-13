const config = require('./config');

module.exports = {
    development: {
        username: config.dbUser,
        password: config.dbPass,
        database: config.dbName,
        host: config.dbHost,
        dialect: 'postgres',
        dialectOptions: {
            bigNumberStrings: true
        }
    },
    test: {
        username: config.dbUser,
        password: config.dbPass,
        database: config.dbName,
        host: config.dbHost,
        dialect: 'postgres',
        dialectOptions: {
            bigNumberStrings: true
        }
    },
    production: {
        username: config.dbUser,
        password: config.dbPass,
        database: config.dbName,
        host: config.dbHost,
        port: config.port,
        dialect: 'postgres',
        dialectOptions: {
            bigNumberStrings: true
        }
    }
};
