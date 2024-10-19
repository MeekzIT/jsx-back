"use strict";
const data = require("../mocs/constructor");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Constuctors", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Constuctors", null, {});
  },
};
