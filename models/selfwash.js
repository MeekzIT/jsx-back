"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SelfWash extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SelfWash.init(
    {
      titleAm: DataTypes.STRING,
      titleRu: DataTypes.STRING,
      titleEn: DataTypes.STRING,
      titleGe: DataTypes.STRING,
      descAm: DataTypes.TEXT,
      descRu: DataTypes.TEXT,
      descEn: DataTypes.TEXT,
      descGe: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "SelfWash",
    }
  );

  let SelfWashImage = sequelize.define("SelfWashImage");

  SelfWash.hasMany(SelfWashImage, {
    foreignKey: "reletedId",
  });

  return SelfWash;
};
