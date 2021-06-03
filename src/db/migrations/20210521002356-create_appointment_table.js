'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('appointments', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      start_time: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
          isDate: {
            args: true,
            msg: "start_time can only be a date."
          }
        }
      },
      end_time: { 
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
          isDate: {
            args: true,
            msg: "end_time can only be a date."
          }
        }
      },
      doctor_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "doctors",
          key: "id"
        },
      },
      patient_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "patients",
          key: "id"
        },
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
      deleted_at: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('appointments');
  }
};
