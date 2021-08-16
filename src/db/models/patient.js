'use strict';

module.exports = (sequelize, DataTypes) => {
  const Patient = sequelize.define('Patient',{
    firstname: DataTypes.STRING,
    surname: DataTypes.STRING,
    id_document: DataTypes.STRING,
    pathology: DataTypes.STRING
  }, {
    paranoid: true,
    underscored: true
  });

  Patient.associate = (models) => {
    Patient.hasOne(models.Appointment, {foreignKey: "patient_id", as: "appointment"});
    Patient.hasOne(models.User, {foreignKey: 'patient_id', as: "user"});
  }

  return Patient;
};