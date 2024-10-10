"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class EquipmentImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  EquipmentImage.init(
    {
      reletedId: DataTypes.INTEGER,
      image: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "EquipmentImage",
    }
  );

  let Equipment = sequelize.define("Equipment");

  EquipmentImage.belongsTo(Equipment, {
    foreignKey: "id",
  });

  return EquipmentImage;
};
