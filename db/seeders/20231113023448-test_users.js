"use strict";
const bcrypt = require("bcrypt");

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

    await queryInterface.bulkInsert("users", [
      {
        full_name: "Jimmy G",
        password: bcrypt.hashSync("hello", 10),
        profile_picture_url:
          "https://firebasestorage.googleapis.com/v0/b/dev-portfolio-sq.appspot.com/o/musician_app_assets%2Fguitarprofile1.jpg?alt=media&token=136000d4-8c6c-4135-a0c0-535f3a9a3984",
        bio: "I love playing the guitar and listening to taylor swift",
        experience: 10,
        career_status: "Semipro",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        full_name: "Big Baby Bobby",
        password: bcrypt.hashSync("hello2", 10),
        profile_picture_url:
          "https://firebasestorage.googleapis.com/v0/b/dev-portfolio-sq.appspot.com/o/musician_app_assets%2Fpexels-pixabay-164835.jpg?alt=media&token=9721a004-ac23-4a04-8ff9-2a9821ca7580",
        bio: "I was born to be a rockstar",
        experience: 5,
        career_status: "Educator",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        full_name: "Andrea Piacquadio",
        password: bcrypt.hashSync("hello3", 10),
        profile_picture_url:
          "https://firebasestorage.googleapis.com/v0/b/dev-portfolio-sq.appspot.com/o/musician_app_assets%2Fpexels-andrea-piacquadio-3760269.jpg?alt=media&token=6b085bd0-7dcf-48cf-9047-6fa346c8b6ff",
        bio: "Not actually my piano, and actually I don't play any instruments. I'm a singer songwriter.",
        experience: 20,
        career_status: "Professional",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        full_name: "Mrs Tubby",
        password: bcrypt.hashSync("hello4", 10),
        profile_picture_url:
          "https://firebasestorage.googleapis.com/v0/b/dev-portfolio-sq.appspot.com/o/musician_app_assets%2Fgoth_girl.jpg?alt=media&token=5c00ee55-e12a-4249-81fe-9a6985e31536",
        bio: "ROCK AND ROLL",
        experience: 3,
        career_status: "Amateur",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        full_name: "Tough Guy",
        password: bcrypt.hashSync("hello5", 10),
        profile_picture_url:
          "https://firebasestorage.googleapis.com/v0/b/dev-portfolio-sq.appspot.com/o/musician_app_assets%2Fladybeard.jpg?alt=media&token=1abf8b8e-0737-4137-932e-419d996a3f10",
        bio: "I am a gentle soul who plays gentle music",
        experience:8,
        career_status: "Professional",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        full_name: "Huge Tortoise",
        password: bcrypt.hashSync("hello6", 10),
        profile_picture_url:
          "https://firebasestorage.googleapis.com/v0/b/sessions-7df6d.appspot.com/o/userprofilepictures%2Ftortoise.jfif?alt=media&token=dfefdb9c-39c9-4281-8880-e37c91dd0d7f",
        bio: "I like to eat cabbage and shrimp and Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        experience:8,
        career_status: "Professional",
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
    await queryInterface.bulkDelete("users", null, {});
  },
};
