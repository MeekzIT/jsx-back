"use strict";
const data = require("../mocs/board");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Boards", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Boards", null, {});
  },
};
