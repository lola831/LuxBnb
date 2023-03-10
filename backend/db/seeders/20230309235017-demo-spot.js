'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */


module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: '123 Disney Lane',
        city: 'San Francisco',
        state: 'California',
        country: 'USA',
        lat: 37.7645358,
        lng: -122.4730327,
        name: 'App Academy',
        description:'Place where web devs go.',
        price: 123
      },
      {
        ownerId: 1,
        address: '155 Disney Lane',
        city: 'San Francisco',
        state: 'California',
        country: 'USA',
        lat: 37.7645350,
        lng: -122.4730329,
        name: 'Bla',
        description:'Place where web devs go.',
        price: 200
      },
      {
        ownerId: 2,
        address: '145 Drewry Lane',
        city: 'Santa Cruz',
        state: 'California',
        country: 'USA',
        lat: 37.7643358,
        lng: -122.4733327,
        name: 'Your house',
        description:'Placejdljd where web devs go.',
        price: 432
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      address: { [Op.in]: ['123 Disney Lane', '155 Disney Lane', '145 Drewry Lane'] }
    }, {});
  }
};
