const { Model, DataTypes } = require('sequelize');
const sequelize = require('.');
const User = require('./user.model');

class Message extends Model {}

Message.init({
  userId: DataTypes.INTEGER,
  content: DataTypes.TEXT,
  timestamp: DataTypes.STRING
}, {sequelize, modelName: 'message'});

Message.belongsTo(User);

module.exports = Message;