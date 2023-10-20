const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('api-ddd', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;