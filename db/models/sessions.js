"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Session extends Model {

    static associate(models) {
      // define association here as further models are added
      Session.belongsTo(models.user)
          }
  }
    Session.init(
        {
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'user',
                    key: 'id',
                }
            },
            currentToken: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            currentRefresh: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            isValid: {
                type: DataTypes.BOOLEAN,
                allowNull:false
            }
        },
        {
            sequelize,
            modelName: "session",
            underscored: true,
        }
  );
  return Session;
};