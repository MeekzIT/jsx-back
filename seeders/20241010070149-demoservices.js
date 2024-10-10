"use strict";
const data = require("../mocs/services");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Services", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Services", null, {});
  },
};
