"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ModuleImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ModuleImage.init(
    {
      reletedId: DataTypes.INTEGER,
      image: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "ModuleImage",
    }
  );

  let Modules = sequelize.define("Modules");

  ModuleImage.belongsTo(Modules, {
    foreignKey: "id",
  });
  return ModuleImage;
};
