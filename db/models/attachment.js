"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Attachment extends Model {
    static associate(models) {
      Attachment.belongsTo(models.userChatroomMessage, {
        foreignKey: "messageId",
      });
    }
  }

  Attachment.init(
    {
      messageId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "userChatroomMessage",
          key: "id",
        },
      },
      attachmentUrl: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      index: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "attachment",
      underscored: true,
      tableName: "attachments",
    }
  );
  return Attachment;
};
