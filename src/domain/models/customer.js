const Sequelize = require('sequelize');
const database = require('../../infra/database/config');
 
const Customer = database.define('customer', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: Sequelize.STRING,
    lastname: Sequelize.STRING,
    age: Sequelize.INTEGER,
    country: Sequelize.STRING,
})
 
module.exports = Customer;