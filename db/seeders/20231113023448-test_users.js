"use strict";

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
        profile_picture_url:
          "https://firebasestorage.googleapis.com/v0/b/dev-portfolio-sq.appspot.com/o/musician_app_assets%2Fguitarprofile1.jpg?alt=media&token=136000d4-8c6c-4135-a0c0-535f3a9a3984",
        bio: "I love playing the guitar and listening to taylor swift",
        experience:
          "About 10 years guitar casually, but never played a gig before. Looking to jam with like minded folks!",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        full_name: "Big Baby Bobby",
        profile_picture_url:
          "https://firebasestorage.googleapis.com/v0/b/dev-portfolio-sq.appspot.com/o/musician_app_assets%2Fpexels-pixabay-164835.jpg?alt=media&token=9721a004-ac23-4a04-8ff9-2a9821ca7580",
        bio: "I was born to be a rockstar",
        experience:
          "I have been playing guitar since I was born. Literally. So 5 years experience.",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        full_name: "Andrea Piacquadio",
        profile_picture_url:
          "https://firebasestorage.googleapis.com/v0/b/dev-portfolio-sq.appspot.com/o/musician_app_assets%2Fpexels-andrea-piacquadio-3760269.jpg?alt=media&token=6b085bd0-7dcf-48cf-9047-6fa346c8b6ff",
        bio: "Not actually my piano, and actually I don't play any instruments. I'm a singer songwriter.",
        experience:
          "Been singing all my life. Also songwriting my whole life. I make all the best songs",
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
