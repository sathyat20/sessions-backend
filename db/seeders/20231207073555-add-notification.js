'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("notifications", [
      {
        user_id: 5,
        origin_table: "connections",
        source_id: 1,
        action: "post",
        has_been_viewed: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("notifications", null, {});
  }
};
