"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class GenreGroup extends Model {
    static associate(models) {
    }
  }
  GenreGroup.init(
    {
      groupId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "group",
          key: "id",
        },
      },
      genreId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "genre",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "genreGroup",
      underscored: true,
      tableName: "genres_groups",
    }
  );
  return GenreGroup;
};
