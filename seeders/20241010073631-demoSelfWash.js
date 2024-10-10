"use strict";
const data = require("../mocs/selfWash");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("SelfWashes", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("SelfWashes", null, {});
  },
};
