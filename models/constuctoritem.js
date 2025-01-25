"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ConstuctorItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ConstuctorItem.init(
    {
      reletedId: DataTypes.INTEGER,
      nameAm: DataTypes.STRING,
      nameRu: DataTypes.STRING,
      nameEn: DataTypes.STRING,
      nameGe: DataTypes.STRING,
      descAm: DataTypes.TEXT,
      descRu: DataTypes.TEXT,
      descEn: DataTypes.TEXT,
      descGe: DataTypes.TEXT,
      order: DataTypes.INTEGER,
      require: DataTypes.BOOLEAN,
      withValue: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "ConstuctorItem",
    }
  );

  let Constuctor = sequelize.define("Constuctor");
  let ConstuctorItemOption = sequelize.define("ConstuctorItemOption");
  ConstuctorItem.belongsTo(Constuctor, {
    foreignKey: "id",
  });
  ConstuctorItem.hasMany(ConstuctorItemOption, {
    foreignKey: "itemId",
  });
  return ConstuctorItem;
};
