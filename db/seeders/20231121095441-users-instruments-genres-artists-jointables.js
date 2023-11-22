'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users_instruments', [
      {
        user_id: 1,
        instrument_id: 3,
        instrument_experience: 10, 
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 1,
        instrument_id: 4,
        instrument_experience: 5, 
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 2,
        instrument_id: 4,
        instrument_experience: 5, 
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 3,
        instrument_id: 9,
        instrument_experience: 20, 
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 4,
        instrument_id: 7,
        instrument_experience: 30, 
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 4,
        instrument_id: 17,
        instrument_experience: 5, 
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 5,
        instrument_id: 3,
        instrument_experience: 7, 
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 5,
        instrument_id: 9,
        instrument_experience: 10, 
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 5,
        instrument_id: 1,
        instrument_experience: 15, 
        created_at: new Date(),
        updated_at: new Date(),
      },
    ])
    await queryInterface.bulkInsert('users_artists', [
      {
        user_id: 1,
        artist_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 1,
        artist_id: 4,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 1,
        artist_id: 7,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 2,
        artist_id: 8,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 3,
        artist_id: 4,

        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 4,
        artist_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 4,
        artist_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 5,
        artist_id: 4,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 5,
        artist_id: 5,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 5,
        artist_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ])
    await queryInterface.bulkInsert('users_genres', [
      {
        user_id: 1,
        genre_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 1,
        genre_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 2,
        genre_id: 8,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 3,
        genre_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 4,
        genre_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 4,
        genre_id:8,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 5,
        genre_id: 5,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 5,
        genre_id: 7,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 5,
        genre_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users_artists", null, {});
    await queryInterface.bulkDelete("users_instruments", null, {});
    await queryInterface.bulkDelete("users_genres", null, {});
  }
};
