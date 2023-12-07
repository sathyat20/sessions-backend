"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Instrument extends Model {

    static associate(models) {
      // define association here as further models are added
      Instrument.belongsToMany(models.user, {through: models.userInstrument})
      Instrument.hasMany(models.userInstrument)
            Instrument.belongsToMany(models.instrumentGroup, {
              through: "instruments_groups",
              foreignKey: "instrumentId",
              as: "instrumentGroupId",
            });
    }
  }
    Instrument.init(
        {
            name: {
                type:DataTypes.STRING,
                allowNull:false,
            }
        },
        {
            sequelize,
            modelName: "instrument",
            underscored: true,
        }
  );
  return Instrument;
};