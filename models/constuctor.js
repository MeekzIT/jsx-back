"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Constuctor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Constuctor.init(
    {
      nameAm: DataTypes.STRING,
      nameRu: DataTypes.STRING,
      nameEn: DataTypes.STRING,
      nameGe: DataTypes.STRING,
      image: DataTypes.STRING,
      width: DataTypes.STRING,
      height: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Constuctor",
    }
  );

  let ConstuctorItem = sequelize.define("ConstuctorItem");

  Constuctor.hasMany(ConstuctorItem, {
    foreignKey: "reletedId",
  });
  return Constuctor;
};
