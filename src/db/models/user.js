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
    User.belongsTo(models.Doctor, {foreignKey: "doctor_id"});
    User.belongsTo(models.Patient, {foreignKey: "patient_id"});
    User.belongsTo(models.Hospital, {foreignKey: "hospital_id"});
  }

  return User;
};