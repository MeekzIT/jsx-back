"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SelfWashImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SelfWashImage.init(
    {
      reletedId: DataTypes.INTEGER,
      image: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "SelfWashImage",
    }
  );

  let SelfWash = sequelize.define("SelfWash");

  SelfWashImage.belongsTo(SelfWash, {
    foreignKey: "id",
  });

  return SelfWashImage;
};
