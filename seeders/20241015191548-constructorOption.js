"use strict";
const data = require("../mocs/constructorOption");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("ConstuctorItemOptions", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("ConstuctorItemOptions", null, {});
  },
};
