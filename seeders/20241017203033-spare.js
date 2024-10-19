"use strict";
const data = require("../mocs/spare");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Spares", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Spares", null, {});
  },
};
