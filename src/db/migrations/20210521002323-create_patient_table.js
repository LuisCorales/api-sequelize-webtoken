'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('patients', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      firstname: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          is: {
            args: /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\'\s]*)$/g,
            msg: "firstname can only contain letters and '."
          },
          len: {
            args: [3, 60],
            msg: "firstname can only have from 3 to 60 letters."
          },
          notNull: {
            msg: "firstname cannot be null."
          }
        }
      },
      surname: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          is: {
            args: /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\'\s]*)$/g,
            msg: "surname can only contain letters and '."
          },
          len: {
            args: [3, 60],
            msg: "surname can only have from 3 to 60 letters."
          },
          notNull: {
            msg: "surname cannot be null."
          }
        }
      },
      id_document: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true,
      },
      pathology: {
        type: Sequelize.STRING(100),
      },
    }, {
      paranoid: true,
      underscored: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('patients');
  }
};
