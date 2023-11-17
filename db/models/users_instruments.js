"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserInstrument extends Model {

    static associate(models) {
      // define association here as further models are added
          }
  }
    UserInstrument.init(
        {
            instrumentExperience: {
                type:DataTypes.FLOAT,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'user',
                    key: 'id',
                }
            },
            instrumentId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'instrument',
                    key: 'id',
                }
            },
        },
        {
            sequelize,
            modelName: "userInstrument",
            underscored: true,
            tableName: "users_instruments"
        }
  );
  return UserInstrument;
};