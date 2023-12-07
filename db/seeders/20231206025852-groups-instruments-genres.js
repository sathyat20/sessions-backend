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
   await queryInterface.bulkInsert("genres_groups", [
     {
       group_id: 1,
       genre_id: 7,
       created_at: new Date(),
       updated_at: new Date(),
     },
     {
       group_id: 2,
       genre_id: 1,
       created_at: new Date(),
       updated_at: new Date(),
     },
     {
       group_id: 3,
       genre_id: 5,
       created_at: new Date(),
       updated_at: new Date(),
     },
     {
       group_id: 4,
       genre_id: 5,
       created_at: new Date(),
       updated_at: new Date(),
     },
     {
       group_id: 5,
       genre_id: 3,
       created_at: new Date(),
       updated_at: new Date(),
     },
   ]);
   

   await queryInterface.bulkInsert("instruments_groups", [
     {
       group_id: 1,
       instrument_id: 1,
       created_at: new Date(),
       updated_at: new Date(),
     },
     {
       group_id: 2,
       instrument_id: 2,
       created_at: new Date(),
       updated_at: new Date(),
     },
     {
       group_id: 3,
       instrument_id: 3,
       created_at: new Date(),
       updated_at: new Date(),
     },
     {
       group_id: 4,
       instrument_id: 4,
       created_at: new Date(),
       updated_at: new Date(),
     },
     {
       group_id: 5,
       instrument_id: 5,
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
    await queryInterface.bulkDelete("genres_groups", null, {}),
    await queryInterface.bulkDelete("instruments_groups", null, {})
  }
};
