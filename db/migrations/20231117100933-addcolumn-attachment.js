"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn("attachments", "chatroom_id", {
      type: Sequelize.INTEGER,
      references: {
        model: "chatrooms",
        key: "id",
      },
    });

    await queryInterface.addColumn("attachments", "file_type", {
      type: Sequelize.STRING,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.removeColumn("attachments", "chatroom_id");
    await queryInterface.removeColumn("attachments", "file_type");
  },
};
