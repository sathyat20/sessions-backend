"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PersonalVideoClip extends Model {

    static associate(models) {
      // define association here as further models are added
      PersonalVideoClip.belongsTo(models.user)
          }
  }

    PersonalVideoClip.init(
        {
            hostUrl: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'user',
                    key: 'id',
                }
            },
        },
        {
            sequelize,
            modelName: "personalVideoClip",
            underscored: true,
        }
  );
  return PersonalVideoClip;
};
