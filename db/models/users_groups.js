"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserGroup extends Model {
    static associate(models) {
      UserGroup.belongsTo(models.user);
      UserGroup.belongsTo(models.group);
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
