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
    await queryInterface.bulkInsert("users_chatrooms", [
      {
        user_id: 1,
        chatroom_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 1,
        chatroom_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 1,
        chatroom_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 2,
        chatroom_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 2,
        chatroom_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 3,
        chatroom_id: 1,
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

    await queryInterface.bulkDelete("users_chatrooms", null, {});
  },
};
