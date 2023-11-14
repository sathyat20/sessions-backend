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
      this.belongsToMany(models.user, { through: "users_chatrooms" });
    }
  }
  Chatroom.init(
    {
      name: { allowNull: false, type: DataTypes.STRING },
      description: { type: DataTypes.TEXT },
      genres_played: { type: DataTypes.STRING },
      instruments_wanted: { type: DataTypes.STRING },
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
