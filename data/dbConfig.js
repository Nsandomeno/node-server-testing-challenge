const knex = require('knex')
const config = require('../knexfile.js')

// if the environment variable is not set, default... 
// ...to development 

// - this variable is only set when running the 
// "test" npm script using 'npm run test'
const dbEnv = process.env.DB_ENV || 'development';

// - the value of dbEnv will be either 'development'
// or 'testing'

// - We pass it within brackets to select the corresponding configuration
// from the knexfile.js
module.exports = knex(config[dbEnv])
// this works because knexfile.js has a dedicated...
// ...configuration key for testing