"use strict";
const data = require("../mocs/selfWashImages");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("SelfWashImages", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("SelfWashImages", null, {});
  },
};
