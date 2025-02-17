"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Modules", {
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
        type: Sequelize.TEXT,
      },
      descRu: {
        type: Sequelize.TEXT,
      },
      descEn: {
        type: Sequelize.TEXT,
      },
      descGe: {
        type: Sequelize.TEXT,
      },
      imageAm: {
        type: Sequelize.TEXT,
      },
      imageRu: {
        type: Sequelize.TEXT,
      },
      imageEn: {
        type: Sequelize.TEXT,
      },
      imageGe: {
        type: Sequelize.TEXT,
      },
      constId: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("Modules");
  },
};
