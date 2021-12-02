const { Sequelize, Model, DataTypes } = require('sequelize');

const config = {
  host: 'localhost',
  dialect: 'postgres',
  //logging: console.log
  logging: false
};

const sequelize = new Sequelize('codeworks-db', 'postgres', 'postgres', config);

module.exports = sequelize;