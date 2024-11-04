"use strict";
const data = require("../mocs/gallery");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Galleries", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Galleries", null, {});
  },
};
