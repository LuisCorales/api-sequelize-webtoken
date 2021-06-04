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

  User.associate = (models) => {
    User.hasOne(models.Doctor, {foreignKey: 'user_id', as: "doctor"});
    User.hasOne(models.Patient, {foreignKey: 'user_id', as: "patient"});
  }

  return User;
};