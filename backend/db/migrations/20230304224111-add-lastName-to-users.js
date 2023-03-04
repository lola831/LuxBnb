'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'lastName', {
      type: Sequelize.STRING(30),
      allowNull: false,

    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'lastName');
  }
};
