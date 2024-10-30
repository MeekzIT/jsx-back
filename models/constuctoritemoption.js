"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ConstuctorItemOption extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ConstuctorItemOption.init(
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
    },
    {
      sequelize,
      modelName: "ConstuctorItemOption",
    }
  );
  let ConstuctorItem = sequelize.define("ConstuctorItem");
  let ConstuctorOptionItem = sequelize.define("ConstuctorOptionItem");
  ConstuctorItemOption.belongsTo(ConstuctorItem, {
    foreignKey: "id",
  });

  ConstuctorItemOption.hasMany(ConstuctorOptionItem, {
    foreignKey: "reletedId",
  });
  return ConstuctorItemOption;
};
