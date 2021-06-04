'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User',{
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    paranoid: true,
    underscored: true
  });

  return User;
};