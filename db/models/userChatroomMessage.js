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
        foreignKey: "chatroom_id",
      });
      UserChatroomMessage.belongsTo(models.user, { foreignKey: "author_id" });
    }
  }
  UserChatroomMessage.init(
    {
      author_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "user",
          key: "id",
        },
      },
      chatroom_id: {
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
