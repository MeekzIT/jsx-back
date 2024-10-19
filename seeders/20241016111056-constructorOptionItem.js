"use strict";
const data = require("../mocs/constructorOptionItem");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("ConstuctorOptionItems", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("ConstuctorOptionItems", null, {});
  },
};
