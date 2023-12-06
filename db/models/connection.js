"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Connection extends Model {

    static associate(models) {
        Connection.belongsTo(models.user, {as: 'requesterRelation', foreignKey:'requesterId'})
        Connection.belongsTo(models.user, { as: 'requestedRelation',foreignKey:'requestedId'})
          }
  }
    Connection.init(
        {
            requesterId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'user',
                    key: 'id',
                }
            },
            requestedId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'user',
                    key: 'id',
                }
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false,
              },
        },
        {
            sequelize,
            modelName: "connection",
            underscored: true,
            tableName: "connections"
        }
  );
  return Connection;
};