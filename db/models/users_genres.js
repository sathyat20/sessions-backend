"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserGenre extends Model {

    static associate(models) {
      // define association here as further models are added
          }
  }
    UserGenre.init(
        {
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'user',
                    key: 'id',
                }
            },
            genreId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'genre',
                    key: 'id',
                }
            },
        },
        {
            sequelize,
            modelName: "userGenre",
            underscored: true,
            tableName: "users_genres"
        }
  );
  return UserGenre;
};