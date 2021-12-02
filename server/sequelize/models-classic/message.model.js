
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('message', {
    authorid: DataTypes.STRING,
    content: DataTypes.TEXT,
    timestamp: DataTypes.STRING
  });
  return Message;
};