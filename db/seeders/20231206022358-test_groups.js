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
   await queryInterface.bulkInsert("groups", [
     {
       group_name: "Groove Quartet",
       is_public: true,
       ensemble_type: "Jazz Band",
       career_status: "Currently looking for a new bassist",
       bio: "10 years of professional touring and monthly fanmeets. Groove Quartet comprises of four talented young hopefuls who aim to breathe new life into the Jazz scene",
       created_at: new Date(),
       updated_at: new Date(),
     },
     {
       group_name: "Spring Seasons",
       is_public: false,
       ensemble_type: "Rock Band",
       career_status: "Amateur",
       bio: "Up and coming rock band hailing from Turkey! Constantly looking to grow the team. Contact one of our members below!",
       created_at: new Date(),
       updated_at: new Date(),
     },
     {
       group_name: "Evergreen Raisins",
       is_public: true,
       ensemble_type: "Gospel Choir",
       career_status: "Professional",
       bio: "10 years of professional touring and monthly fanmeets. Groove Quartet comprises of four talented young hopefuls who aim to breathe new life into the Jazz scene",
       created_at: new Date(),
       updated_at: new Date(),
     },
     {
       group_name: "Hail Mary Jesus",
       is_public: false,
       ensemble_type: "Gospel Duo",
       career_status: "Professional",
       bio: "15 years of experience in touring the world and filling churches with our sweet voices and unique charms!",
       created_at: new Date(),
       updated_at: new Date(),
     },
     {
       group_name: "Rap Game",
       is_public: true,
       ensemble_type: "Rap Trio",
       career_status: "Amateur",
       bio: "Newly formed rap trio with members from all around Southeast Asia, looking to breathe new life into the rap scene in Singapore!",
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
    await queryInterface.bulkDelete("groups", null, {})
  }
};
