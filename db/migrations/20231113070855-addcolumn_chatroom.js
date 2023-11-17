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
    await queryInterface.addColumn("chatrooms", "description", {
      type: Sequelize.TEXT,
    });

    await queryInterface.addColumn("chatrooms", "genres_played", {
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn("chatrooms", "instruments_wanted", {
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
    await queryInterface.removeColumn("chatrooms", "description");
    await queryInterface.removeColumn("chatrooms", "genresPlayed");
    await queryInterface.removeColumn("chatrooms", "instrumentsWanted");
  },
};
