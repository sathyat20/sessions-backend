"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class InstrumentGroup extends Model {
    static associate(models) {
      // define association here as further models are added
      // InstrumentGroup.hasMany(models.group);
      // InstrumentGroup.belongsToMany(models.instrument, {
      //   through: "instruments",
      //   foreignKey: "groupId",
      //   as: "groupIds",
      // });
    }
  }
  InstrumentGroup.init(
    {
      groupId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "group",
          key: "id",
        },
      },
      instrumentId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "instrument",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "instrumentGroup",
      underscored: true,
      tableName: "instruments_groups",
    }
  );
  return InstrumentGroup;
};
