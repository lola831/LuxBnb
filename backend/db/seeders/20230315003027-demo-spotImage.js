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
        url: "https://img.sunset02.com/sunsetm/wp-content-uploads/2019-03-25UTC05/mdk9-dog-haus-rahdesign-pr-0718-900x506.jpg",
        preview: true,
      },
      {
        spotId: 2,
        url: "https://i5.walmartimages.com/seo/Home-Bazaar-Heart-Cottage-Dog-House-Red_e71c8b7f-8f3f-4b87-a4d6-5a653896b514_1.4c349c142843ab91dddce6b7019a24fd.jpeg",
        preview: true,
      },
      {
        spotId: 1,
        url: "https://preview.redd.it/oru0c68d9rm71.jpg?width=1080&crop=smart&auto=webp&s=f6f846166ebe6156b5ac721b590910519f744993",
        preview: false,
      },
      {
        spotId: 1,
        url: "https://hips.hearstapps.com/vidthumb/images/how-to-make-a-dog-bed-1579621316.jpg",
        preview: false,
      },
      {
        spotId: 1,
        url: "https://www.asouthernbucket.com/cdn/shop/products/dog_toys_staged1closeup_2000x.jpg?v=1587660243",
        preview: false,
      },
      {
        spotId: 1,
        url: "https://hgtvhome.sndimg.com/content/dam/images/hgtv/fullset/2012/10/19/0/original_Marian-Parsons-Pet-Food-Station-Beauty2_s4x3.jpg.rend.hgtvcom.1280.960.suffix/1400973517033.jpeg",
        preview: false,
      },
      {
        spotId: 2,
        url: "https://s42814.pcdn.co/wp-content/uploads/2020/01/Lawn_iStock-502848762.0-1-scaled.jpg.optimal.jpg",
        preview: false,
      },
      {
        spotId: 2,
        url: "https://www.savingshepherd.com/cdn/shop/products/1_51e1e3e9-3ca4-4d15-b8e7-2e16e201a905_700x.jpeg?v=1508424899",
        preview: false,
      },
      {
        spotId: 2,
        url: "https://rocketandrex.com/cdn/shop/collections/siberian-husky-dog_1200x630.jpg?v=1616543436",
        preview: false,
      },
      {
        spotId: 2,
        url: "https://www.calblendsoils.com/wp-content/uploads/2019/07/back-yard-250890_1280.jpg",
        preview: false,
      },
      {
        spotId: 3,
        url: "https://www.scotsman.com/webimg/b25lY21zOjRkYzhhZjQzLTc5ZTItNDQzNC05MWVlLTk1ZjBkNmQ1N2NjYTo1NGQ3NDk0OS04OTc2LTRkN2YtYTQ4Yi1mMGRkN2EzODQyZGE=.jpg?crop=3:2,smart&width=640&quality=65&enable=upscale",
        preview: true,
      },
      {
        spotId: 3,
        url: "https://s3.amazonaws.com/st1.itrip.net/upload/1600/f7fd3fcf422349d8bfef619eb9b28b79_1_201_a.1604966379.jpg",
        preview: false,
      },
      {
        spotId: 3,
        url: "https://s3.amazonaws.com/st1.itrip.net/upload/1600/1eed47fc0bb34b9381d7ac2db48ee1da_1_201_a.1604966388.jpg",
        preview: false,
      },
      {
        spotId: 3,
        url: "https://www.futuristarchitecture.com/wp-content/uploads/2022/02/pet-dog-next-to-sea-view-beach-house-windows-.jpg",
        preview: false,
      },
      {
        spotId: 3,
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTONIOns7m2AZWXjoF6DHfXg7hhUFeEI89jpw&usqp=CAU",
        preview: false,
      },
      {
        spotId: 4,
        url: "https://www.doghealth.com/images/goingcampingwithadog.jpg",
        preview: true,
      },
      {
        spotId: 4,
        url: "https://firesidehound.com/cdn/shop/products/extra-larger-dog-bed-81_1024x1024@2x.jpg?v=1605810906",
        preview: false,
      },
      {
        spotId: 4,
        url: "https://images.unsplash.com/photo-1600354279787-0a726615ef44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZG9nJTIwZm9yZXN0fGVufDB8fDB8fHww&w=1000&q=80",
        preview: false,
      },
      {
        spotId: 4,
        url: "https://mlxkll71glbl.i.optimole.com/cb:sejj.9658/w:1800/h:1200/q:mauto/https://explore.bookoutdoors.com/wp-content/uploads/dog-friendly-camping-in-colorado-1.webp",
        preview: false,
      },
      {
        spotId: 4,
        url: "https://tahoebestfriends.com/wp-content/uploads/2017/08/Untitled.png",
        preview: false,
      },
      {
        spotId: 5,
        url: "https://i.pinimg.com/originals/f2/53/43/f25343a48870617b8ea870a8031331ea.jpg",
        preview: true,
      },
      {
        spotId: 5,
        url: "https://i.pinimg.com/564x/bf/ce/50/bfce503909455fb644af1b6633223ee4.jpg",
        preview: false,
      },
      {
        spotId: 5,
        url: "https://images.squarespace-cdn.com/content/v1/6179b420dbe737161a484a87/e405c7ea-d789-4b0a-80b1-0e54f71c3311/Inspiring+Dog-Friendly+Backyard+Landscaping+Ideas.jpeg",
        preview: false,
      },
      {
        spotId: 5,
        url: "https://st.hzcdn.com/fimgs/1111ac7403bdae55_3859-w660-h441-b0-p0--traditional-kitchen.jpg",
        preview: false,
      },
      {
        spotId: 5,
        url: "https://cdn.decorpad.com/photos/2017/07/06/m_built-in-recessed-dog-bed.jpg",
        preview: false,
      },
      {
        spotId: 6,
        url: "https://i.pinimg.com/564x/b3/d0/78/b3d0789b7bcd7b994234aedf5bbf693c.jpg",
        preview: true,
      },
      {
        spotId: 6,
        url: "https://cdn.outsideonline.com/wp-content/uploads/2022/04/astroturf_h.jpg",
        preview: false,
      },
      {
        spotId: 6,
        url: "https://static.houselogic.com/content/images/landscaping-dogs-yard-mulch_44f12133a26c1fe4b20d2360f79eb011.jpg",
        preview: false,
      },
      {
        spotId: 6,
        url: "https://www.thespruce.com/thmb/Pv7ignGwgsEf53zEH-B5Hj8EWR0=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/LH_KK_19036-e3c3b865bcb244fa8e6725547893588b.jpeg",
        preview: false,
      },
      {
        spotId: 6,
        url: "https://nextluxury.com/wp-content/uploads/amazing-dog-room.jpg",
        preview: false,
      },
      {
        spotId: 7,
        url: "https://nextluxury.com/wp-content/uploads/dog-room-1.jpg",
        preview: true,
      },
      {
        spotId: 7,
        url: "https://cdn.outsideonline.com/wp-content/uploads/2022/04/astroturf_h.jpg",
        preview: false,
      },
      {
        spotId: 7,
        url: "https://static.houselogic.com/content/images/landscaping-dogs-yard-mulch_44f12133a26c1fe4b20d2360f79eb011.jpg",
        preview: false,
      },
      {
        spotId: 7,
        url: "https://www.thespruce.com/thmb/Pv7ignGwgsEf53zEH-B5Hj8EWR0=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/LH_KK_19036-e3c3b865bcb244fa8e6725547893588b.jpeg",
        preview: false,
      },
      {
        spotId: 7,
        url: "https://nextluxury.com/wp-content/uploads/amazing-dog-room.jpg",
        preview: false,
      },
      {
        spotId: 8,
        url: "https://www.flytesofancy.co.uk/cdn/shop/products/Buckland-Dog-Kennel-Large-Fern-and-Fly-1000.jpg?v=1663766068",
        preview: true,
      },
      {
        spotId: 8,
        url: "https://cdn.outsideonline.com/wp-content/uploads/2022/04/astroturf_h.jpg",
        preview: false,
      },
      {
        spotId: 8,
        url: "https://static.houselogic.com/content/images/landscaping-dogs-yard-mulch_44f12133a26c1fe4b20d2360f79eb011.jpg",
        preview: false,
      },
      {
        spotId: 8,
        url: "https://www.thespruce.com/thmb/Pv7ignGwgsEf53zEH-B5Hj8EWR0=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/LH_KK_19036-e3c3b865bcb244fa8e6725547893588b.jpeg",
        preview: false,
      },
      {
        spotId: 8,
        url: "https://nextluxury.com/wp-content/uploads/amazing-dog-room.jpg",
        preview: false,
      },
      {
        spotId: 9,
        url: "https://i0.wp.com/meccinteriors.com/wp-content/uploads/2019/09/eco-chic-dog-houses-are-a-real-thing-2.jpg?resize=620%2C462&ssl=1",
        preview: true,
      },
      {
        spotId: 9,
        url: "https://cdn.outsideonline.com/wp-content/uploads/2022/04/astroturf_h.jpg",
        preview: false,
      },
      {
        spotId: 9,
        url: "https://static.houselogic.com/content/images/landscaping-dogs-yard-mulch_44f12133a26c1fe4b20d2360f79eb011.jpg",
        preview: false,
      },
      {
        spotId: 9,
        url: "https://www.thespruce.com/thmb/Pv7ignGwgsEf53zEH-B5Hj8EWR0=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/LH_KK_19036-e3c3b865bcb244fa8e6725547893588b.jpeg",
        preview: false,
      },
      {
        spotId: 9,
        url: "https://nextluxury.com/wp-content/uploads/amazing-dog-room.jpg",
        preview: false,
      },
      {
        spotId: 10,
        url: "https://hgtvhome.sndimg.com/content/dam/images/hgtv/fullset/2020/1/10/0/Original_Flynnside-Out_DOG-OBSESSED_lead-beauty.jpg.rend.hgtvcom.616.411.suffix/1578675251288.jpeg",
        preview: true,
      },
      {
        spotId: 10,
        url: "https://cdn.outsideonline.com/wp-content/uploads/2022/04/astroturf_h.jpg",
        preview: false,
      },
      {
        spotId: 10,
        url: "https://static.houselogic.com/content/images/landscaping-dogs-yard-mulch_44f12133a26c1fe4b20d2360f79eb011.jpg",
        preview: false,
      },
      {
        spotId: 10,
        url: "https://www.thespruce.com/thmb/Pv7ignGwgsEf53zEH-B5Hj8EWR0=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/LH_KK_19036-e3c3b865bcb244fa8e6725547893588b.jpeg",
        preview: false,
      },
      {
        spotId: 10,
        url: "https://nextluxury.com/wp-content/uploads/amazing-dog-room.jpg",
        preview: false,
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
          url: "https://img.sunset02.com/sunsetm/wp-content-uploads/2019-03-25UTC05/mdk9-dog-haus-rahdesign-pr-0718-900x506.jpg",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://i5.walmartimages.com/seo/Home-Bazaar-Heart-Cottage-Dog-House-Red_e71c8b7f-8f3f-4b87-a4d6-5a653896b514_1.4c349c142843ab91dddce6b7019a24fd.jpeg",
          preview: true,
        },
        {
          spotId: 1,
          url: "https://preview.redd.it/oru0c68d9rm71.jpg?width=1080&crop=smart&auto=webp&s=f6f846166ebe6156b5ac721b590910519f744993",
          preview: false,
        },
        {
          spotId: 1,
          url: "https://hips.hearstapps.com/vidthumb/images/how-to-make-a-dog-bed-1579621316.jpg",
          preview: false,
        },
        {
          spotId: 1,
          url: "https://www.asouthernbucket.com/cdn/shop/products/dog_toys_staged1closeup_2000x.jpg?v=1587660243",
          preview: false,
        },
        {
          spotId: 1,
          url: "https://hgtvhome.sndimg.com/content/dam/images/hgtv/fullset/2012/10/19/0/original_Marian-Parsons-Pet-Food-Station-Beauty2_s4x3.jpg.rend.hgtvcom.1280.960.suffix/1400973517033.jpeg",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://s42814.pcdn.co/wp-content/uploads/2020/01/Lawn_iStock-502848762.0-1-scaled.jpg.optimal.jpg",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://www.savingshepherd.com/cdn/shop/products/1_51e1e3e9-3ca4-4d15-b8e7-2e16e201a905_700x.jpeg?v=1508424899",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://rocketandrex.com/cdn/shop/collections/siberian-husky-dog_1200x630.jpg?v=1616543436",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://www.calblendsoils.com/wp-content/uploads/2019/07/back-yard-250890_1280.jpg",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://www.scotsman.com/webimg/b25lY21zOjRkYzhhZjQzLTc5ZTItNDQzNC05MWVlLTk1ZjBkNmQ1N2NjYTo1NGQ3NDk0OS04OTc2LTRkN2YtYTQ4Yi1mMGRkN2EzODQyZGE=.jpg?crop=3:2,smart&width=640&quality=65&enable=upscale",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://s3.amazonaws.com/st1.itrip.net/upload/1600/f7fd3fcf422349d8bfef619eb9b28b79_1_201_a.1604966379.jpg",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://s3.amazonaws.com/st1.itrip.net/upload/1600/1eed47fc0bb34b9381d7ac2db48ee1da_1_201_a.1604966388.jpg",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://www.futuristarchitecture.com/wp-content/uploads/2022/02/pet-dog-next-to-sea-view-beach-house-windows-.jpg",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTONIOns7m2AZWXjoF6DHfXg7hhUFeEI89jpw&usqp=CAU",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://www.doghealth.com/images/goingcampingwithadog.jpg",
          preview: true,
        },
        {
          spotId: 4,
          url: "https://firesidehound.com/cdn/shop/products/extra-larger-dog-bed-81_1024x1024@2x.jpg?v=1605810906",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://images.unsplash.com/photo-1600354279787-0a726615ef44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZG9nJTIwZm9yZXN0fGVufDB8fDB8fHww&w=1000&q=80",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://mlxkll71glbl.i.optimole.com/cb:sejj.9658/w:1800/h:1200/q:mauto/https://explore.bookoutdoors.com/wp-content/uploads/dog-friendly-camping-in-colorado-1.webp",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://tahoebestfriends.com/wp-content/uploads/2017/08/Untitled.png",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://i.pinimg.com/originals/f2/53/43/f25343a48870617b8ea870a8031331ea.jpg",
          preview: true,
        },
        {
          spotId: 5,
          url: "https://i.pinimg.com/564x/bf/ce/50/bfce503909455fb644af1b6633223ee4.jpg",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://images.squarespace-cdn.com/content/v1/6179b420dbe737161a484a87/e405c7ea-d789-4b0a-80b1-0e54f71c3311/Inspiring+Dog-Friendly+Backyard+Landscaping+Ideas.jpeg",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://st.hzcdn.com/fimgs/1111ac7403bdae55_3859-w660-h441-b0-p0--traditional-kitchen.jpg",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://cdn.decorpad.com/photos/2017/07/06/m_built-in-recessed-dog-bed.jpg",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://i.pinimg.com/564x/b3/d0/78/b3d0789b7bcd7b994234aedf5bbf693c.jpg",
          preview: true,
        },
        {
          spotId: 6,
          url: "https://cdn.outsideonline.com/wp-content/uploads/2022/04/astroturf_h.jpg",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://static.houselogic.com/content/images/landscaping-dogs-yard-mulch_44f12133a26c1fe4b20d2360f79eb011.jpg",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://www.thespruce.com/thmb/Pv7ignGwgsEf53zEH-B5Hj8EWR0=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/LH_KK_19036-e3c3b865bcb244fa8e6725547893588b.jpeg",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://nextluxury.com/wp-content/uploads/amazing-dog-room.jpg",
          preview: false,
        },
        {
          spotId: 7,
          url: "https://nextluxury.com/wp-content/uploads/dog-room-1.jpg",
          preview: true,
        },
        {
          spotId: 7,
          url: "https://cdn.outsideonline.com/wp-content/uploads/2022/04/astroturf_h.jpg",
          preview: false,
        },
        {
          spotId: 7,
          url: "https://static.houselogic.com/content/images/landscaping-dogs-yard-mulch_44f12133a26c1fe4b20d2360f79eb011.jpg",
          preview: false,
        },
        {
          spotId: 7,
          url: "https://www.thespruce.com/thmb/Pv7ignGwgsEf53zEH-B5Hj8EWR0=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/LH_KK_19036-e3c3b865bcb244fa8e6725547893588b.jpeg",
          preview: false,
        },
        {
          spotId: 7,
          url: "https://nextluxury.com/wp-content/uploads/amazing-dog-room.jpg",
          preview: false,
        },
        {
          spotId: 8,
          url: "https://www.flytesofancy.co.uk/cdn/shop/products/Buckland-Dog-Kennel-Large-Fern-and-Fly-1000.jpg?v=1663766068",
          preview: true,
        },
        {
          spotId: 8,
          url: "https://cdn.outsideonline.com/wp-content/uploads/2022/04/astroturf_h.jpg",
          preview: false,
        },
        {
          spotId: 8,
          url: "https://static.houselogic.com/content/images/landscaping-dogs-yard-mulch_44f12133a26c1fe4b20d2360f79eb011.jpg",
          preview: false,
        },
        {
          spotId: 8,
          url: "https://www.thespruce.com/thmb/Pv7ignGwgsEf53zEH-B5Hj8EWR0=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/LH_KK_19036-e3c3b865bcb244fa8e6725547893588b.jpeg",
          preview: false,
        },
        {
          spotId: 8,
          url: "https://nextluxury.com/wp-content/uploads/amazing-dog-room.jpg",
          preview: false,
        },
        {
          spotId: 9,
          url: "https://i0.wp.com/meccinteriors.com/wp-content/uploads/2019/09/eco-chic-dog-houses-are-a-real-thing-2.jpg?resize=620%2C462&ssl=1",
          preview: true,
        },
        {
          spotId: 9,
          url: "https://cdn.outsideonline.com/wp-content/uploads/2022/04/astroturf_h.jpg",
          preview: false,
        },
        {
          spotId: 9,
          url: "https://static.houselogic.com/content/images/landscaping-dogs-yard-mulch_44f12133a26c1fe4b20d2360f79eb011.jpg",
          preview: false,
        },
        {
          spotId: 9,
          url: "https://www.thespruce.com/thmb/Pv7ignGwgsEf53zEH-B5Hj8EWR0=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/LH_KK_19036-e3c3b865bcb244fa8e6725547893588b.jpeg",
          preview: false,
        },
        {
          spotId: 9,
          url: "https://nextluxury.com/wp-content/uploads/amazing-dog-room.jpg",
          preview: false,
        },
        {
          spotId: 10,
          url: "https://hgtvhome.sndimg.com/content/dam/images/hgtv/fullset/2020/1/10/0/Original_Flynnside-Out_DOG-OBSESSED_lead-beauty.jpg.rend.hgtvcom.616.411.suffix/1578675251288.jpeg",
          preview: true,
        },
        {
          spotId: 9,
          url: "https://cdn.outsideonline.com/wp-content/uploads/2022/04/astroturf_h.jpg",
          preview: false,
        },
        {
          spotId: 9,
          url: "https://static.houselogic.com/content/images/landscaping-dogs-yard-mulch_44f12133a26c1fe4b20d2360f79eb011.jpg",
          preview: false,
        },
        {
          spotId: 9,
          url: "https://www.thespruce.com/thmb/Pv7ignGwgsEf53zEH-B5Hj8EWR0=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/LH_KK_19036-e3c3b865bcb244fa8e6725547893588b.jpeg",
          preview: false,
        },
        {
          spotId: 9,
          url: "https://nextluxury.com/wp-content/uploads/amazing-dog-room.jpg",
          preview: false,
        },
      ]
    });
  }
};
