"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("users_chatrooms_messages", [
      {
        author_id: 5,
        chatroom_id: 1,
        content:
          "Hello! We're looking for emo kids to jam with, anyone up for it?",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        author_id: 4,
        chatroom_id: 1,
        content: "I WANT 2 JAM",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("users_chatrooms_messages", null, {});
  },
};
