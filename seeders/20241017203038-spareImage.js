"use strict";
const data = require("../mocs/spareImages");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("SpareImages", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("SpareImages", null, {});
  },
};
