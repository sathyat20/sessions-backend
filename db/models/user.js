"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here as further models are added
      User.hasMany(models.videoClip);
      User.belongsToMany(models.artist, { through: "users_artists" });
      User.belongsToMany(models.genre, { through: "users_genres" });
      User.belongsToMany(models.instrument, { through: models.userInstrument });
      User.belongsToMany(models.user, {as: 'requestedId', foreignKey: 'requesterId', through: models.connection })
      User.belongsToMany(models.user, {as: 'requesterId', foreignKey: 'requestedId', through: models.connection })
      User.hasMany(models.userInstrument);
      User.belongsToMany(models.chatroom, { through: "users_chatrooms" });
    }
  }
  User.init(
    {
      fullName: { type: DataTypes.STRING, allowNull: false },
      password: { type: DataTypes.TEXT, allowNull: false },
      profilePictureUrl: DataTypes.STRING,
      bio: DataTypes.TEXT,
      experience: DataTypes.INTEGER,
      careerStatus: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "user",
      underscored: true,
    }
  );
  return User;
};
