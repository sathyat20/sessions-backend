'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users_jam_sessions', {
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
      jam_session_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model:'jam_sessions',
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
    });

    await queryInterface.createTable('users_chatrooms_messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      author_id: {
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
      content: {
        allowNull: false,
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
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('userchat');
    await queryInterface.dropTable('users_chatrooms_messages');
  }
};
