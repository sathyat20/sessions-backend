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
        author_id: 1,
        chatroom_id: 1,
        content: "What's you guys' favourite genre?",
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        author_id: 1,
        chatroom_id: 1,
        content: "I love jazz",
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        author_id: 2,
        chatroom_id: 1,
        content: "I love jazz too. Miles Davis is my favourite. How about you?",
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        author_id: 2,
        chatroom_id: 1,
        content:
          "But I also enjoy rock music, especially classic rock bands like Led Zeppelin and Van Halen",
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        author_id: 3,
        chatroom_id: 1,
        content:
          "Nice choices! Personally, I'm a fan of electronic music, particularly techno.",
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        author_id: 1,
        chatroom_id: 1,
        content: "Get out of my jam room",
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        author_id: 2,
        chatroom_id: 1,
        content:
          "I've been meaning to explore more techno. Any specific tracks you recommend?",
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        author_id: 3,
        chatroom_id: 1,
        content:
          "Sure thing! Check out 'Strobe' by Deadmau5 and 'Spaceman' by Hardwell.",
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        author_id: 1,
        chatroom_id: 1,
        content: "Thanks for the recommendations! I'll give it a shot",
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
