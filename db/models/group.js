"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    static associate(models) {
      // define association here as further models are added
      Group.belongsToMany(models.user, {
        through: "userGroup",
        // foreignKey: "groupId",
        as: "Users",
      });

      Group.belongsToMany(models.genreGroup, {
        through: "genres_groups",
        foreignKey: "groupId",
        as: "genreGroupId",
      });

      Group.belongsToMany(models.instrumentGroup, {
        through: "instruments_groups",
        foreignKey: "groupId",
        as: "instrumentGroupId",
      });

      Group.hasMany(models.videoClip, {
        foreignKey: "groupId"
      });

      Group.belongsToMany(models.user, {
        through: models.videoClip,
        foreignKey: "groupId",
      });
    }
  }
  Group.init(
    {
      groupName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      isPublic: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      ensembleType: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      careerStatus: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      bio: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      profilePictureUrl: {
        allowNull: true,
        type: DataTypes.STRING
      }
    },
    {
      sequelize,
      modelName: "group",
      underscored: true,
      tableName: "groups",
    }
  );
  return Group;
};
