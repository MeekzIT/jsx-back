"use strict";
const data = require("../mocs/constructorItem");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("ConstuctorItems", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("ConstuctorItems", null, {});
  },
};
