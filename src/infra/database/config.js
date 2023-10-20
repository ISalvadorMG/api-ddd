const { Sequelize } = require('sequelize');
require('dotenv').config()

console.log(process.env.DATABASE_NAME);

const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
  host: process.env.DATABASE_HOST,
  dialect: 'postgres',
});

module.exports = sequelize;