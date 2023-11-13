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
        name: "metal heads and goth girls only",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "LOFI-KAWAII!11!!",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Blues Jam, any level. Every saturday, venue TBC",
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
