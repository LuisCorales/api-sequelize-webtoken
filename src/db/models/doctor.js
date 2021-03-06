'use strict';

module.exports = (sequelize, DataTypes) => {
  const Doctor = sequelize.define('Doctor',{
    firstname: DataTypes.STRING,
    surname: DataTypes.STRING,
    speciality: DataTypes.STRING,
  }, {
    paranoid: true,
    underscored: true
  });

  Doctor.associate = (models) => {
    Doctor.belongsTo(models.Hospital, {foreignKey: 'hospital_id', as: "hospital"});
    Doctor.hasOne(models.Appointment, {foreignKey: 'doctor_id', as: "appointment"});

    Doctor.hasOne(models.User, {foreignKey: 'doctor_id', as: "user"});
  }

  return Doctor;
};