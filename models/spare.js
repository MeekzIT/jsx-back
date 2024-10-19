"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Spare extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Spare.init(
    {
      titleAm: DataTypes.STRING,
      titleRu: DataTypes.STRING,
      titleEn: DataTypes.STRING,
      titleGe: DataTypes.STRING,
      descAm: DataTypes.STRING,
      descRu: DataTypes.STRING,
      descEn: DataTypes.STRING,
      descGe: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Spare",
    }
  );

  let SpareImage = sequelize.define("SpareImage");

  Spare.hasMany(SpareImage, {
    foreignKey: "reletedId",
  });

  return Spare;
};
