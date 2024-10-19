"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ConstuctorItemOptionItemOption extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ConstuctorItemOptionItemOption.init(
    {
      itemId: DataTypes.INTEGER,
      nameAm: DataTypes.STRING,
      nameRu: DataTypes.STRING,
      nameEn: DataTypes.STRING,
      nameGe: DataTypes.STRING,
      descAm: DataTypes.TEXT,
      descRu: DataTypes.TEXT,
      destEn: DataTypes.TEXT,
      descGe: DataTypes.TEXT,
      image: DataTypes.STRING,
      price: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ConstuctorItemOptionItemOption",
    }
  );

  const ConstuctorOptionItem = sequelize.define("ConstuctorOptionItem");
  ConstuctorItemOptionItemOption.belongsTo(ConstuctorOptionItem, {
    foreignKey: "id",
  });

  return ConstuctorItemOptionItemOption;
};
