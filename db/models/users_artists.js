"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserArtist extends Model {

    static associate(models) {
      // define association here as further models are added
          }
  }
    UserArtist.init(
        {
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'user',
                    key: 'id',
                }
            },
            artistId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'artist',
                    key: 'id',
                }
            },
        },
        {
            sequelize,
            modelName: "userArtist",
            underscored: true,
            tableName: "users_artists"
        }
  );
  return UserArtist;
};