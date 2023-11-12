"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here as further models are added
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
