'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Promise.all([
      queryInterface.createTable('users_artists', {
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
            model:'users',
            key:'id',
          }
        },
        artist_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model:'artists',
            key:'id',
          }
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

      queryInterface.createTable('users_genres', {
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
            model:'users',
            key:'id',
          }
        },
        genre_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model:'genres',
            key:'id',
          }
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

      queryInterface.createTable('users_songs', {
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
            model:'users',
            key:'id',
          }
        },
        song_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model:'songs',
            key:'id',
          }
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

      queryInterface.createTable('users_chatrooms', {
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
            model:'users',
            key:'id',
          }
        },
        chatroom_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model:'chatrooms',
            key:'id',
          }
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

      queryInterface.createTable('users_instruments', {
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
            model:'users',
            key:'id',
          }
        },
        instrument_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model:'instruments',
            key:'id',
          }
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

      queryInterface.createTable('video_clips', {
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
            model:'users',
            key:'id',
          }
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

      queryInterface.createTable('jam_sessions', {
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
            model:'chatrooms',
            key:'id',
          }
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

      queryInterface.createTable('connections', {
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
            model:'users',
            key:'id',
          }
        },
        requested_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model:'users',
            key:'id',
          }
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
    ])
  },

  

  async down (queryInterface, Sequelize) {
    await Promise.all([
      queryInterface.dropTable('users_artists'),
      queryInterface.dropTable('users_genres'),
      queryInterface.dropTable('users_songs'),
      queryInterface.dropTable('users_chatrooms'),
      queryInterface.dropTable('users_instruments'),
      queryInterface.dropTable('video_clips'),
      queryInterface.dropTable('jam_sessions'),
      queryInterface.dropTable('connections'),
    ])
  }
};
