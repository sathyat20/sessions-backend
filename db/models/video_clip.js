"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class VideoClip extends Model {

    static associate(models) {
      // define association here as further models are added   
    }
  }

    VideoClip.init(
      {
        hostUrl: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        userId: {
          type: DataTypes.INTEGER,
          references: {
            model: "user",
            key: "id",
          },
        },
        groupId: {
          type: DataTypes.INTEGER,
          references: {
            model: "group",
            key: "id",
          },
        },
      },
      {
        sequelize,
        modelName: "videoClip",
        underscored: true,
      }
    );
  return VideoClip;
};
