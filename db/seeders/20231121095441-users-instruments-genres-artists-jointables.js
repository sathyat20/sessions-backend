'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users_instruments', [
      {
        user_id: 1,
        instrument_id: 3,
        highest_qualification: 'Self Taught',
        qualification_institution: '',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 1,
        instrument_id: 4,
        highest_qualification: 'Self Taught',
        qualification_institution: '',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 2,
        instrument_id: 4,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 3,
        instrument_id: 9,
        highest_qualification: "Diploma",
        qualification_institution: "Berklee College of Music",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 4,
        instrument_id: 7,
        highest_qualification: 'Doctorate',
        qualification_institution: 'School of Rock',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 4,
        instrument_id: 17,
        highest_qualification: 'Grade 5',
        qualification_institution: 'ABRSM',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 5,
        instrument_id: 3,
        highest_qualification: 'Masters',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 5,
        instrument_id: 9,
        highest_qualification: "Bachelor's Degree",
        qualification_institution: 'Yong Siew Toh Conservatory of Music', 
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 5,
        instrument_id: 1,
        highest_qualification: 'Grade 5',
        qualification_institution: 'Dubious School',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 6,
        instrument_id: 20,
        highest_qualification: 'Doctorate',
        qualification_institution: 'UNDER THE SEA',
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
      {
        user_id: 6,
        artist_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 6,
        artist_id: 4,
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
      {
        user_id: 6,
        genre_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 6,
        genre_id: 5,
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
