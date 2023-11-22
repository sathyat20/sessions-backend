"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Chatroom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here as further models are added'
      this.hasMany(models.userChatroomMessage);
      this.hasMany(models.attachment, { foreignKey: "chatroomId" });
      this.belongsToMany(models.user, { through: "users_chatrooms" });
    }
  }
  Chatroom.init(
    {
      name: { allowNull: false, type: DataTypes.STRING },
      description: { type: DataTypes.TEXT },
      genresPlayed: { type: DataTypes.STRING },
      instrumentsWanted: { type: DataTypes.STRING },
    },
    {
      sequelize,
      modelName: "chatroom",
      timestamps: true,
      underscored: true,
    }
  );
  return Chatroom;
};
