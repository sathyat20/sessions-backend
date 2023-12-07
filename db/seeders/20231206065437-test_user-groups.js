'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert("users_groups", [
     {
       group_id: 1,
       user_id: 1,
       is_admin: true,
       created_at: new Date(),
       updated_at: new Date(),
     },
     {
       group_id: 2,
       user_id: 1,
       is_admin: false,
       created_at: new Date(),
       updated_at: new Date(),
     },
     {
       group_id: 3,
       user_id: 2,
       is_admin: true,
       created_at: new Date(),
       updated_at: new Date(),
     },
     {
       group_id: 4,
       user_id: 3,
       is_admin: false,
       created_at: new Date(),
       updated_at: new Date(),
     },
     {
       group_id: 5,
       user_id: 4,
       is_admin: true,
       created_at: new Date(),
       updated_at: new Date(),
     },
     {
       group_id: 1,
       user_id: 2,
       is_admin: false,
       created_at: new Date(),
       updated_at: new Date(),
     },
     {
       group_id: 3,
       user_id: 4,
       is_admin: false,
       created_at: new Date(),
       updated_at: new Date(),
     },
     {
       group_id: 2,
       user_id: 4,
       is_admin: true,
       created_at: new Date(),
       updated_at: new Date(),
     },
     {
       group_id: 4,
       user_id: 5,
       is_admin: true,
       created_at: new Date(),
       updated_at: new Date(),
     },
   ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("users_groups", null, {})
  }
};
