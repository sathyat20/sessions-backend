'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('instruments', [
      {
        name: 'Piano',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Violin',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Acoustic Guitar',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Electric Guitar',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Drums',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Keyboard',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Electric Bass',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Double Bass',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Voice',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Saxophone',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Viola',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Cello',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Flute',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Oboe',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Clarinet',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Bassoon',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Trumpet',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Horn',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Trombone',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Tuba',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Percussion',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Harp',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ])
    await queryInterface.bulkInsert('artists', [
      {
        name: 'Beethoven',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Mozart',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'The Beatles',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Taylor Swift',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Justin Bieber',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'John Coltrane',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Duke Ellington',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Coldplay',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ])
    await queryInterface.bulkInsert('genres', [
      {
        name: 'Rock',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Pop',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Hip hop',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'R&B',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Classical',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Electronic',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Jazz',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Metal',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ])
  },
  

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
    await queryInterface.bulkDelete("artists", null, {});
    await queryInterface.bulkDelete("genres", null, {});
    await queryInterface.bulkDelete("instruments", null, {});   
  }
};
