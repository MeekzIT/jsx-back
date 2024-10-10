"use strict";
const data = require("../mocs/equipmentImages ");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("EquipmentImages", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("EquipmentImages", null, {});
  },
};
