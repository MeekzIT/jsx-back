"use strict";
const data = require("../mocs/about");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("AboutUs", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("AboutUs", null, {});
  },
};
