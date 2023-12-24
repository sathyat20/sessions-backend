"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Promise.all([
      queryInterface.createTable("users_artists", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        user_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: "users",
            key: "id",
          },
        },
        artist_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: "artists",
            key: "id",
          },
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      }),

      queryInterface.createTable("users_genres", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        user_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: "users",
            key: "id",
          },
        },
        genre_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: "genres",
            key: "id",
          },
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      }),

      queryInterface.createTable("users_songs", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        user_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: "users",
            key: "id",
          },
        },
        song_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: "songs",
            key: "id",
          },
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      }),

      queryInterface.createTable("users_chatrooms", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        user_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: "users",
            key: "id",
          },
        },
        chatroom_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: "chatrooms",
            key: "id",
          },
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      }),

      queryInterface.createTable("users_instruments", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        user_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: "users",
            key: "id",
          },
        },
        instrument_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: "instruments",
            key: "id",
          },
        },
        highest_qualification: {
          type: Sequelize.STRING,
        },
        qualification_institution: {
          type: Sequelize.STRING,
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      }),

      queryInterface.createTable("users_groups", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        group_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: "groups",
            key: "id",
          },
        },
        user_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: "users",
            key: "id",
          },
        },
        is_admin: {
          allowNull: false,
          type: Sequelize.BOOLEAN,
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      }),

      queryInterface.createTable("video_clips", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        user_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: "users",
            key: "id",
          },
        },
        group_id: {
          allowNull: true,
          type: Sequelize.INTEGER,
          references: {
            model: "groups",
            key: "id",
          },
        },
        host_url: {
          type: Sequelize.STRING,
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      }),

      queryInterface.createTable("jam_sessions", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        chatroom_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: "chatrooms",
            key: "id",
          },
        },
        session_date: {
          type: Sequelize.DATE,
        },
        location: {
          type: Sequelize.TEXT,
        },
        notes: {
          type: Sequelize.TEXT,
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      }),

      queryInterface.createTable("connections", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        requester_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: "users",
            key: "id",
          },
        },
        requested_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: "users",
            key: "id",
          },
        },
        status: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      }),

      queryInterface.createTable("genres_groups", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        group_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: "groups",
            key: "id",
          },
        },
        genre_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: "genres",
            key: "id",
          },
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      }),

      queryInterface.createTable("notifications", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        user_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: "users",
            key: "id",
          },
        },
        origin_table: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        source_id: {
          type: Sequelize.INTEGER,
        },
        action: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        details: {
          type: Sequelize.TEXT,
        },
        has_been_viewed: {
          type: Sequelize.BOOLEAN,
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      }),

      queryInterface.createTable("instruments_groups", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        group_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: "groups",
            key: "id",
          },
        },
        instrument_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: "instruments",
            key: "id",
          },
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      }),

      queryInterface.createTable("sessions", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        user_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: "users",
            key: "id",
          },
        },
        current_token: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        current_refresh: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        is_valid: {
          allowNull: false,
          type: Sequelize.BOOLEAN,
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      }),


    ]);
  },

  async down(queryInterface, Sequelize) {
    await Promise.all([
      queryInterface.dropTable("users_artists"),
      queryInterface.dropTable("users_genres"),
      queryInterface.dropTable("users_songs"),
      queryInterface.dropTable("users_chatrooms"),
      queryInterface.dropTable("users_instruments"),
      queryInterface.dropTable("users_groups"),
      queryInterface.dropTable("video_clips"),
      queryInterface.dropTable("jam_sessions"),
      queryInterface.dropTable("connections"),
      queryInterface.dropTable("genres_groups"),
      queryInterface.dropTable("instruments_groups"),
      queryInterface.dropTable("notifications"),
    ]);
  },
};
