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
        address: '123 Woof Lane',
        city: 'San Francisco',
        state: 'California',
        country: 'USA',
        lat: 37.7695358,
        lng: -123.4730327,
        name: 'Urban Pup Paradise',
        description:'Located in the heart of the city, this trendy dog-friendly apartment offers a blend of style and comfort. Your canine companion will enjoy long walks in the nearby dog parks and lounging on the private balcony with a view.',
        price: 99
      },
      {
        ownerId: 1,
        address: '1565 Rosco Drive',
        city: 'Monterey',
        state: 'California',
        country: 'USA',
        lat: 38.7645950,
        lng: -122.4730329,
        name: 'Cozy Cottage Retreat',
        description:"Escape to this charming dog-friendly cottage, nestled amidst nature's beauty. Your furry friend will love exploring the surrounding trails and frolicking in the spacious backyard. The cozy interior provides a perfect retreat after a day of adventure.",
        price: 200
      },
      {
        ownerId: 2,
        address: '6485 Puppy Cove',
        city: 'Santa Cruz',
        state: 'California',
        country: 'USA',
        lat: 36.7643958,
        lng: -112.4733327,
        name: 'Seaside Dog Haven',
        description:'Experience the ultimate beach getaway with your furry friend at this seaside dog haven. The accommodation offers direct access to the beach, where your dog can play in the sand and splash in the waves. Relax on the deck and soak up the sun together.',
        price: 400
      },
      {
        ownerId: 2,
        address: '65 Rufus Street',
        city: 'Santa Cruz',
        state: 'California',
        country: 'USA',
        lat: 30.7643359,
        lng: -152.4733327,
        name: 'Tranquil Forest Lodge',
        description:"Embrace serenity at this forest lodge that welcomes dogs with open arms. Surrounded by tall trees and tranquil trails, it's a haven for nature-loving pups. Explore the wilderness during the day and snuggle by the fireplace at night.",
        price: 250
      },
      {
        ownerId: 3,
        address: '585 Ocean Street',
        city: 'Santa Cruz',
        state: 'California',
        country: 'USA',
        lat: 67.7643358,
        lng: -121.9733327,
        name: 'Pawsome Pet Paradise',
        description:"Welcome to Pawsome Pet Paradise, where your furry friend will experience a vacation of their own! Our spacious home offers a large fenced backyard, cozy indoor lounging areas, and dedicated play zones. Rest assured, your pup will receive all the love and attention they deserve during their stay.",
        price: 250
      },
      {
        ownerId: 3,
        address: '349845 Pawz Street',
        city: 'Santa Cruz',
        state: 'California',
        country: 'USA',
        lat: 30.7603358,
        lng: -102.4703327,
        name: 'Canine Comfort Retreat',
        description:"Experience a home away from home for your beloved dog at Canine Comfort Retreat. Our cozy residence is equipped with plush beds, pet-friendly furniture, and a backyard oasis for playtime. Your pup will enjoy daily walks and companionship in a safe, caring environment.",
        price: 200
      },
      {
        ownerId: 3,
        address: '45 Tail Street',
        city: 'Santa Cruz',
        state: 'California',
        country: 'USA',
        lat: 38.7603358,
        lng: -122.9733327,
        name: 'Tail-Wagging Haven',
        description:"Tail-Wagging Haven is designed to provide a loving and secure retreat for your furry family member. Our home features spacious play areas, pet-friendly amenities, and a dedicated team of dog lovers. Your pup will have a blast socializing and making new friends.",
        price: 180
      },
      {
        ownerId: 3,
        address: '930 Fluffy Street',
        city: 'Santa Cruz',
        state: 'California',
        country: 'USA',
        lat: 37.7640058,
        lng: -122.4733327,
        name: 'Doggy Dream Den',
        description:"At Doggy Dream Den, we offer a dog-centric home where tail wags and belly rubs abound. Our cozy setup includes comfortable sleeping quarters, interactive toys, and a backyard filled with doggy delights. Your pup will have a pawsitively wonderful stay!",
        price: 180
      },
      {
        ownerId: 3,
        address: '33422 Bark Avenue',
        city: 'Santa Cruz',
        state: 'California',
        country: 'USA',
        lat: 37.7643300,
        lng: -112.4737327,
        name: 'Fur-tastic Retreat Residence',
        description:"Join us at Fur-tastic Retreat Residence, a place where dogs are cherished guests. Our home boasts comfy sleeping quarters, interactive playtime, and regular walks in the nearby parks. Your dog will experience a memorable and tail-wagging vacation with us.",
        price: 308
      },
      {
        ownerId: 3,
        address: '3202 Bingo Street',
        city: 'Santa Cruz',
        state: 'California',
        country: 'USA',
        lat: 27.7949358,
        lng: -102.4730327,
        name: 'Pampered Paws Palace',
        description:"Indulge your furry friend in the luxury of Pampered Paws Palace. Our opulent home features plush bedding, gourmet doggy treats, and personalized care. Your dog will be treated like royalty, with ample playtime and attention from our dedicated staff.",
        price: 150
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      [Op.or]: [
        {
          ownerId: 1,
          address: '123 Woof Lane',
          city: 'San Francisco',
          state: 'California',
          country: 'USA',
          lat: 37.7695358,
          lng: -123.4730327,
          name: 'Urban Pup Paradise',
          description:'Located in the heart of the city, this trendy dog-friendly apartment offers a blend of style and comfort. Your canine companion will enjoy long walks in the nearby dog parks and lounging on the private balcony with a view.',
          price: 99
        },
        {
          ownerId: 1,
          address: '1565 Rosco Drive',
          city: 'Monterey',
          state: 'California',
          country: 'USA',
          lat: 38.7645950,
          lng: -122.4730329,
          name: 'Cozy Cottage Retreat',
          description:"Escape to this charming dog-friendly cottage, nestled amidst nature's beauty. Your furry friend will love exploring the surrounding trails and frolicking in the spacious backyard. The cozy interior provides a perfect retreat after a day of adventure.",
          price: 200
        },
        {
          ownerId: 2,
          address: '6485 Puppy Cove',
          city: 'Santa Cruz',
          state: 'California',
          country: 'USA',
          lat: 36.7643958,
          lng: -112.4733327,
          name: 'Seaside Dog Haven',
          description:'Experience the ultimate beach getaway with your furry friend at this seaside dog haven. The accommodation offers direct access to the beach, where your dog can play in the sand and splash in the waves. Relax on the deck and soak up the sun together.',
          price: 400
        },
        {
          ownerId: 2,
          address: '65 Rufus Street',
          city: 'Santa Cruz',
          state: 'California',
          country: 'USA',
          lat: 30.7643359,
          lng: -152.4733327,
          name: 'Tranquil Forest Lodge',
          description:"Embrace serenity at this forest lodge that welcomes dogs with open arms. Surrounded by tall trees and tranquil trails, it's a haven for nature-loving pups. Explore the wilderness during the day and snuggle by the fireplace at night.",
          price: 250
        },
        {
          ownerId: 3,
          address: '585 Ocean Street',
          city: 'Santa Cruz',
          state: 'California',
          country: 'USA',
          lat: 67.7643358,
          lng: -121.9733327,
          name: 'Pawsome Pet Paradise',
          description:"Welcome to Pawsome Pet Paradise, where your furry friend will experience a vacation of their own! Our spacious home offers a large fenced backyard, cozy indoor lounging areas, and dedicated play zones. Rest assured, your pup will receive all the love and attention they deserve during their stay.",
          price: 250
        },
        {
          ownerId: 3,
          address: '349845 Pawz Street',
          city: 'Santa Cruz',
          state: 'California',
          country: 'USA',
          lat: 30.7603358,
          lng: -102.4703327,
          name: 'Canine Comfort Retreat',
          description:"Experience a home away from home for your beloved dog at Canine Comfort Retreat. Our cozy residence is equipped with plush beds, pet-friendly furniture, and a backyard oasis for playtime. Your pup will enjoy daily walks and companionship in a safe, caring environment.",
          price: 200
        },
        {
          ownerId: 3,
          address: '45 Tail Street',
          city: 'Santa Cruz',
          state: 'California',
          country: 'USA',
          lat: 38.7603358,
          lng: -122.9733327,
          name: 'Tail-Wagging Haven',
          description:"Tail-Wagging Haven is designed to provide a loving and secure retreat for your furry family member. Our home features spacious play areas, pet-friendly amenities, and a dedicated team of dog lovers. Your pup will have a blast socializing and making new friends.",
          price: 180
        },
        {
          ownerId: 3,
          address: '930 Fluffy Street',
          city: 'Santa Cruz',
          state: 'California',
          country: 'USA',
          lat: 37.7640058,
          lng: -122.4733327,
          name: 'Doggy Dream Den',
          description:"At Doggy Dream Den, we offer a dog-centric home where tail wags and belly rubs abound. Our cozy setup includes comfortable sleeping quarters, interactive toys, and a backyard filled with doggy delights. Your pup will have a pawsitively wonderful stay!",
          price: 180
        },
        {
          ownerId: 3,
          address: '33422 Bark Avenue',
          city: 'Santa Cruz',
          state: 'California',
          country: 'USA',
          lat: 37.7643300,
          lng: -112.4737327,
          name: 'Fur-tastic Retreat Residence',
          description:"Join us at Fur-tastic Retreat Residence, a place where dogs are cherished guests. Our home boasts comfy sleeping quarters, interactive playtime, and regular walks in the nearby parks. Your dog will experience a memorable and tail-wagging vacation with us.",
          price: 308
        },
        {
          ownerId: 3,
          address: '3202 Bingo Street',
          city: 'Santa Cruz',
          state: 'California',
          country: 'USA',
          lat: 27.7949358,
          lng: -102.4730327,
          name: 'Pampered Paws Palace',
          description:"Indulge your furry friend in the luxury of Pampered Paws Palace. Our opulent home features plush bedding, gourmet doggy treats, and personalized care. Your dog will be treated like royalty, with ample playtime and attention from our dedicated staff.",
          price: 150
        },
      ]
    }, {});
  }
};
