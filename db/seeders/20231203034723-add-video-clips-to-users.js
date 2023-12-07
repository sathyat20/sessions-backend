"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert("video_clips", [
      {
        user_id: 5,
        host_url: 'https://firebasestorage.googleapis.com/v0/b/sessions-7df6d.appspot.com/o/sample-videos%2Fguitarist%20(720p).mp4?alt=media&token=b6aa02c2-acfd-472a-882e-af5bc1d7e4fd',
        index: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 4,
        host_url: 'https://firebasestorage.googleapis.com/v0/b/sessions-7df6d.appspot.com/o/sample-videos%2Fpexels_videos_1722591%20(1080p).mp4?alt=media&token=ab2a59de-984d-4e78-924d-bd1fedf15fbe',
        index: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 5,
        host_url: 'https://firebasestorage.googleapis.com/v0/b/sessions-7df6d.appspot.com/o/sample-videos%2Fpexels_videos_1722591%20(1080p).mp4?alt=media&token=ab2a59de-984d-4e78-924d-bd1fedf15fbe',
        index: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 3,
        host_url: 'https://firebasestorage.googleapis.com/v0/b/sessions-7df6d.appspot.com/o/sample-videos%2Fpexels_videos_1795798%20(1080p).mp4?alt=media&token=a1266615-9698-4010-ac44-13486f561d5a',
        index: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 2,
        host_url: 'https://firebasestorage.googleapis.com/v0/b/sessions-7df6d.appspot.com/o/sample-videos%2Fvideo%20(2160p).mp4?alt=media&token=63d1f88c-da1a-41e3-ab1d-21850ceb9968',
        index: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 5,
        host_url: 'https://firebasestorage.googleapis.com/v0/b/sessions-7df6d.appspot.com/o/sample-videos%2Fpexels_videos_1795798%20(1080p).mp4?alt=media&token=a1266615-9698-4010-ac44-13486f561d5a',
        index: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 5,
        host_url: 'https://firebasestorage.googleapis.com/v0/b/sessions-7df6d.appspot.com/o/sample-videos%2Fvideo%20(2160p).mp4?alt=media&token=63d1f88c-da1a-41e3-ab1d-21850ceb9968',
        index: 4,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 6,
        host_url: 'https://firebasestorage.googleapis.com/v0/b/sessions-7df6d.appspot.com/o/sample-videos%2Fvideo%20(2160p).mp4?alt=media&token=63d1f88c-da1a-41e3-ab1d-21850ceb9968',
        index: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("video_clips", null, {});
  },
};
