"use strict";
const data = require("../mocs/constructorOptionItemOption");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "ConstuctorItemOptionItemOptions",
      data,
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      "ConstuctorItemOptionItemOptions",
      null,
      {}
    );
  },
};
