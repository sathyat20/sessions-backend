"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserGroup extends Model {
    static associate(models) {
      // define association here as further models are added
      // UserGroup.belongsToMany(models.user, {
      //   through: "users_groups",
      //   foreignKey: "userId",
      //   as: "users",
      // });
      // UserGroup.belongsToMany(models.group, {
      //    through: "users_groups",
      //   foreignKey: "groupId",
      //   as: "groups",
      // }
      // );
    }
  }
  UserGroup.init(
    {
      groupId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      isAdmin: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: "userGroup",
      underscored: true,
      tableName: "users_groups",
    }
  );
  return UserGroup;
};
