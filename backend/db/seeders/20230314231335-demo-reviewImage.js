'use strict';

/** @type {import('sequelize-cli').Migration} */


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'ReviewImages';
    return queryInterface.bulkInsert(options, [
      {
        reviewId: 1,
        url: "https://images.app.goo.gl/34dCruHeHjEyS3Gd6",
      },
      {
        reviewId: 2,
        url: "https://images.app.goo.gl/AG4v5i7cmHkiVn7H6",
      },

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      [Op.or]: [
        {
          reviewId: 1,
          url: "https://images.app.goo.gl/34dCruHeHjEyS3Gd6",
        },
        {
          reviewId: 2,
          url: "https://images.app.goo.gl/AG4v5i7cmHkiVn7H6",
        }
    ]
    });
  }
};
