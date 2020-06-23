const {Pool} = require('pg')

const db = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'express',
  password: 'cyril!123',
  database: 'expressdb',
})


module.exports = db;