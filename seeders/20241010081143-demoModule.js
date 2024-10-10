"use strict";
const data = require("../mocs/module");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Modules", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Modules", null, {});
  },
};
