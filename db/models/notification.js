"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {

    static associate(models) {
      // define association here as further models are added
      Notification.belongsTo(models.user)
          }
  }
    Notification.init(
        {
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'user',
                    key: 'id',
                }
            },
            originTable: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            sourceId: DataTypes.INTEGER,
            action: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            details: DataTypes.TEXT,
            hasBeenViewed: {
                type: DataTypes.BOOLEAN,
                allowNull:false
            }
        },
        {
            sequelize,
            modelName: "notification",
            underscored: true,
        }
  );
  return Notification;
};