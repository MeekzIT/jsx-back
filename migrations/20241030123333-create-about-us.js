'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AboutUs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      titleAm: {
        type: Sequelize.STRING
      },
      titileRu: {
        type: Sequelize.STRING
      },
      titileEn: {
        type: Sequelize.STRING
      },
      titleGe: {
        type: Sequelize.STRING
      },
      textAm: {
        type: Sequelize.TEXT
      },
      textRu: {
        type: Sequelize.TEXT
      },
      textEn: {
        type: Sequelize.TEXT
      },
      textGe: {
        type: Sequelize.TEXT
      },
      image: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('AboutUs');
  }
};