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
      descEn: DataTypes.TEXT,
      descGe: DataTypes.TEXT,
      image: DataTypes.STRING,
      price: DataTypes.STRING,
      showIn: DataTypes.BOOLEAN,
      width: DataTypes.STRING,
      height: DataTypes.STRING,
      mobileImage: DataTypes.STRING,
      mobileWidth: DataTypes.STRING,
      mobileHeight: DataTypes.STRING,
      order: DataTypes.INTEGER,
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
