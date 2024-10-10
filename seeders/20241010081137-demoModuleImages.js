"use strict";
const data = require("../mocs/moduleImages");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("ModuleImages", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("ModuleImages", null, {});
  },
};
