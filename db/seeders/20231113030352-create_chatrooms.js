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
    await queryInterface.bulkInsert("chatrooms", [
      {
        name: "Metalheads and Goth Girls",
        description:
          "We accept anyone to come to join us for jams! Except taylor swift fans",
        genres_played: "djent",
        instruments_wanted: "Electric Guitar, Bassist",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "LOFI Tunes, Instrumental jamming",
        description:
          "chill instrumental jam sessions, anything goes. We're also looking for a producer to help record and mix songs!",
        genres_played: "Lo-Fi, Chillhop, Instrumentals",
        instruments_wanted: "Saxophone",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Blues Jam, any level. Every saturday, venue TBC",
        description: "nothing like the blues",
        genres_played: "Rock, Classic Rock",
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
    await queryInterface.bulkDelete("chatrooms", null, {});
  },
};
