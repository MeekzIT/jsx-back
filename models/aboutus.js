'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AboutUs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AboutUs.init({
    titleAm: DataTypes.STRING,
    titileRu: DataTypes.STRING,
    titileEn: DataTypes.STRING,
    titleGe: DataTypes.STRING,
    textAm: DataTypes.TEXT,
    textRu: DataTypes.TEXT,
    textEn: DataTypes.TEXT,
    textGe: DataTypes.TEXT,
    image: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'AboutUs',
  });
  return AboutUs;
};