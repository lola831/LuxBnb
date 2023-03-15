'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: "https://images.app.goo.gl/34dCruHeHjEyS3Gd6",
        preview: true,
      },
      {
        spotId: 2,
        url: "https://images.app.goo.gl/AG4v5i7cmHkiVn7H6",
        preview: true,
      },
      {
      spotId: 3,
      url: "https://images.app.goo.gl/AG4v5i7cmHkiVn7H6",
      preview: true,
      },

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      [Op.or]: [
        {
          spotId: 1,
          url: "https://images.app.goo.gl/34dCruHeHjEyS3Gd6",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://images.app.goo.gl/AG4v5i7cmHkiVn7H6",
          preview: true,
        },
        {
        spotId: 3,
        url: "https://images.app.goo.gl/AG4v5i7cmHkiVn7H6",
        preview: true,
        }
    ]
    });
  }
};
