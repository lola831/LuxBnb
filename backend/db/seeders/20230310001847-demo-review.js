'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 2,
        review: 'Great spot!',
        stars: 5,
      },
      {
        spotId: 2,
        userId: 1,
        review: 'It was okay',
        stars: 3,
      },
      {
        spotId: 3,
        userId: 2,
        review: 'Very clean place',
        stars: 5,
      },

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      [Op.or]: [
        {
          spotId: 1,
          userId: 2,
          review: 'Great spot!',
          stars: 5,
        },
        {
          spotId: 2,
          userId: 1,
          review: 'It was okay',
          stars: 3,
        },
        {
          spotId: 3,
          userId: 2,
          review: 'Very clean place',
          stars: 5,
        }
    ]
    });
  }
};
