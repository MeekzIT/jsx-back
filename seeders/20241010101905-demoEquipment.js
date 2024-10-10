"use strict";
const data = require("../mocs/equipment");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Equipment", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Equipment", null, {});
  },
};
