"use strict";
const data = require("../mocs/boardImages");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("BoardImages", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("BoardImages", null, {});
  },
};
