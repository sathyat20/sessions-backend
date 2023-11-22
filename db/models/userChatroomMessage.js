"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserChatroomMessage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here as further models are added'
      UserChatroomMessage.belongsTo(models.chatroom, {
        foreignKey: "chatroomId",
      });
      UserChatroomMessage.belongsTo(models.user, { foreignKey: "authorId" });
      UserChatroomMessage.hasMany(models.attachment, {
        foreignKey: "messageId",
      });
    }
  }

  UserChatroomMessage.init(
    {
      authorId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "user",
          key: "id",
        },
      },
      chatroomId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "chatroom",
          key: "id",
        },
      },
      content: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: "userChatroomMessage",
      timestamps: true,
      underscored: true,
      tableName: "users_chatrooms_messages",
    }
  );
  return UserChatroomMessage;
};
