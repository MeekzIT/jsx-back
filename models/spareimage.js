"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SpareImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SpareImage.init(
    {
      reletedId: DataTypes.INTEGER,
      image: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "SpareImage",
    }
  );

  let Spare = sequelize.define("Spare");

  SpareImage.belongsTo(Spare, {
    foreignKey: "id",
  });
  return SpareImage;
};
