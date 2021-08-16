'use strict';

module.exports = (sequelize, DataTypes) => {
  const Hospital = sequelize.define('Hospital',{
    name: DataTypes.STRING
  }, {
    deleted_at: false,
    paranoid: true,
    underscored: true
  });

  Hospital.associate = (models) => {
    Hospital.hasMany(models.Doctor, {foreignKey: 'hospital_id', as: "doctor"});

    Hospital.hasOne(models.User, {foreignKey: 'hospital_id', as: "user"});
  }

  return Hospital;
};