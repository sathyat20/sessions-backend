"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
      // define association here as further models are added
      User.hasMany(models.personalVideoClip) 
      User.belongsToMany(models.artist, {through:'users_artists'})
      User.belongsToMany(models.genre, {through:'users_genres'})
      User.belongsToMany(models.instrument, {through:models.userInstrument})
      User.hasMany(models.userInstrument)
          }
  }
  User.init(
    {
      fullName: DataTypes.STRING,
      profilePictureUrl: DataTypes.STRING,
      bio: DataTypes.TEXT,
      experience: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "user",
      underscored: true,
    }
  );
  return User;
};
