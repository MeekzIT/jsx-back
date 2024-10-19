"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Spares", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      titleAm: {
        type: Sequelize.STRING,
      },
      titleRu: {
        type: Sequelize.STRING,
      },
      titleEn: {
        type: Sequelize.STRING,
      },
      titleGe: {
        type: Sequelize.STRING,
      },
      descAm: {
        type: Sequelize.STRING,
      },
      descRu: {
        type: Sequelize.STRING,
      },
      descEn: {
        type: Sequelize.STRING,
      },
      descGe: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Spares");
  },
};
