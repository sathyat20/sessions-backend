'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("connections", [
      {
        requester_id: 5,
        requested_id: 4,
        status: 'confirmed',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        requester_id: 5,
        requested_id: 3,
        status: 'confirmed',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        requester_id: 5,
        requested_id: 2,
        status: 'confirmed',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        requester_id: 1,
        requested_id: 5,
        status: 'pending',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        requester_id: 3,
        requested_id: 4,
        status: 'confirmed',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        requester_id: 2,
        requested_id: 3,
        status: 'confirmed',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        requester_id: 1,
        requested_id: 4,
        status: 'confirmed',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        requester_id: 1,
        requested_id: 2,
        status: 'confirmed',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("connections", null, {});
  }
};
