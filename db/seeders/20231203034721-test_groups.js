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
       ensemble_type: "Band",
       career_status: "Currently looking for a new bassist",
       bio: "10 years of professional touring and monthly fanmeets. Groove Quartet comprises of four talented young hopefuls who aim to breathe new life into the Jazz scene",
       profile_picture_url:
         "https://firebasestorage.googleapis.com/v0/b/sessions-7df6d.appspot.com/o/groupimages%2FThe_Loveliest_Time.png?alt=media&token=ccdd04f5-142a-4ac1-b5f5-58714995183e",
       created_at: new Date(),
       updated_at: new Date(),
     },
     {
       group_name: "Spring Seasons",
       is_public: false,
       ensemble_type: "Band",
       career_status: "Amateur",
       bio: "Up and coming rock band hailing from Turkey! Constantly looking to grow the team. Contact one of our members below!",
       profile_picture_url:
         "https://firebasestorage.googleapis.com/v0/b/sessions-7df6d.appspot.com/o/groupimages%2FScreenshot%202023-07-31%20at%202.11.45%20PM.png?alt=media&token=7a776c2f-3442-4403-b7d2-895f526903fd",
       created_at: new Date(),
       updated_at: new Date(),
     },
     {
       group_name: "Evergreen Raisins",
       is_public: true,
       ensemble_type: "Choir",
       career_status: "Professional",
       bio: "10 years of professional touring and monthly fanmeets. Groove Quartet comprises of four talented young hopefuls who aim to breathe new life into the Jazz scene",
       profile_picture_url:
         "https://firebasestorage.googleapis.com/v0/b/sessions-7df6d.appspot.com/o/groupimages%2F014_13.jpg?alt=media&token=17a11561-f00b-4a64-8793-47b7bd4931fe",
       created_at: new Date(),
       updated_at: new Date(),
     },
     {
       group_name: "Hail Mary Jesus",
       is_public: false,
       ensemble_type: "Duo",
       career_status: "Professional",
       bio: "15 years of experience in touring the world and filling churches with our sweet voices and unique charms!",
       profile_picture_url:
         "https://firebasestorage.googleapis.com/v0/b/sessions-7df6d.appspot.com/o/groupimages%2F014_13.jpg?alt=media&token=17a11561-f00b-4a64-8793-47b7bd4931fe",
       created_at: new Date(),
       updated_at: new Date(),
     },
     {
       group_name: "Rap Game",
       is_public: true,
       ensemble_type: "Trio",
       career_status: "Amateur",
       bio: "Newly formed rap trio with members from all around Southeast Asia, looking to breathe new life into the rap scene in Singapore!",
       profile_picture_url:
         "https://firebasestorage.googleapis.com/v0/b/sessions-7df6d.appspot.com/o/groupimages%2F014_13.jpg?alt=media&token=17a11561-f00b-4a64-8793-47b7bd4931fe",
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
