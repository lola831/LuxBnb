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
        description:'Nice apartment with a very cozy living room, a large terrace, an equipped kitchen, two bedrooms and a bathroom. The house is very bright thanks to the large windows. It is located in a quiet area where several means of transport that connect it both to the center of the city in 15/20min and to the airport of Milan in 15 min.',
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
        description:'This elegant converted 1925 church rectory in French Gothic style features original stained-glass windows, and one charming guestroom + bath with claw foot tub/shower, chandelier, A/C, and shared kitchen. Enjoy a sunny morning coffee in the garden, a glass of wine, or read by the fire in the living room on chilly nights. A peaceful oasis amidst the city, comfy, cozy, and beautiful. Quite private—we’re rarely downstairs & cook 3-4 eves/week. ',
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
        description:'Located close to the Tibetan Buddhist temple Odsal Ling, Toca is a space of retreat for those who wish to be near Sao Paulo and still have a good connection with nature. A house, built of wooden base, brick and glass is surrounded by a green field of 5000 m2 where, over the last 20 years,  it has being planted various species of fruit trees and ornamental plants.',
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
