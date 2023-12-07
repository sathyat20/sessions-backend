"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Artist extends Model {

    static associate(models) {
      // define association here as further models are added
      Artist.belongsToMany(models.user, {
        through:'users_artists'})
          }
  }

    Artist.init(
        {
            name: {
                type:DataTypes.STRING,
                allowNull:false,
            }
        },
        {
            sequelize,
            modelName: "artist",
            underscored: true,
        }
  );
  return Artist;
};