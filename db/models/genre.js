"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Genre extends Model {

    static associate(models) {
      // define association here as further models are added
      Genre.belongsToMany(models.user, {through:'users_genres'})
          }
  }
    Genre.init(
        {
            name: {
                type:DataTypes.STRING,
                allowNull:false,
            }
        },
        {
            sequelize,
            modelName: "genre",
            underscored: true,
        }
  );
  return Genre;
};