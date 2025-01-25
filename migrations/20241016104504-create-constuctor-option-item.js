"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ConstuctorOptionItems", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      reletedId: {
        type: Sequelize.INTEGER,
      },
      nameAm: {
        type: Sequelize.STRING,
      },
      nameRu: {
        type: Sequelize.STRING,
      },
      nameEn: {
        type: Sequelize.STRING,
      },
      nameGe: {
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
      order: {
        type: Sequelize.INTEGER,
      },
      require: {
        type: Sequelize.BOOLEAN,
      },
      withValue: {
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable("ConstuctorOptionItems");
  },
};
