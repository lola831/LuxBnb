'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 1,
        startDate: '2023-11-19',
        endDate: '2023-11-22'
      },
      {
        spotId: 1,
        userId: 3,
        startDate: '2023-11-25',
        endDate: '2023-11-30'
      },
      {
        spotId: 3,
        userId: 2,
        startDate: '2024-01-19',
        endDate: '2024-01-22'
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      [Op.or]: [
      {
        spotId: 1,
        userId: 1,
        startDate: '2023-11-19',
        endDate: '2023-11-22'
      },
      {
        spotId: 1,
        userId: 3,
        startDate: '2023-11-25',
        endDate: '2023-11-30'
      },
      {
        spotId: 3,
        userId: 2,
        startDate: '2024-01-19',
        endDate: '2024-01-22'
      }
    ]
    });
  }
};
