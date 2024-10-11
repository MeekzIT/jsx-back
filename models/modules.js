"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Modules extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Modules.init(
    {
      titleAm: DataTypes.STRING,
      titleRu: DataTypes.STRING,
      titleEn: DataTypes.STRING,
      titleGe: DataTypes.STRING,
      descAm: DataTypes.TEXT,
      descRu: DataTypes.TEXT,
      descEn: DataTypes.TEXT,
      descGe: DataTypes.TEXT,
      imageAm: DataTypes.TEXT,
      imageRu: DataTypes.TEXT,
      imageEn: DataTypes.TEXT,
      imageGe: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Modules",
    }
  );

  let ModuleImage = sequelize.define("ModuleImage");

  Modules.hasMany(ModuleImage, {
    foreignKey: "reletedId",
  });

  return Modules;
};
