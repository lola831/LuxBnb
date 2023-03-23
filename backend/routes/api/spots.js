const express = require('express');
const { Op, json } = require("sequelize");
const { Spot, Review, SpotImage, User, ReviewImage, Booking, sequelize } = require('../../db/models');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { ValidationError } = require('sequelize');
const { ResultWithContext } = require('express-validator/src/chain');
// const { validateReview } = require('./reviews.js')

const validateBooking = [
  check('endDate')
    .exists({checkFalsy: true})
    .isDate()
    .withMessage('Must have an end date'),
  check('startDate')
    .exists({checkFalsy: true})
    .isDate()
    .withMessage('Must have a start date'),
    check('endDate').custom((value, { req }) => {
      if(new Date(value) <= new Date(req.body.startDate)) {
          throw new Error ('endDate cannot come before startDate');
      }
      return true;
  }),
  handleValidationErrors
];

const validateReview = [
  check('review')
      .exists({checkFalsy: true})
      .withMessage('Review text is required'),
  check('stars')
      .exists({checkFalsy: true})
      .isInt({ min: 1, max: 5})
      .withMessage('Stars must be an integer from 1 to 5'),
  handleValidationErrors
]

const validateSpot = [
  check('address')
    .exists({ checkFalsy: true })
    .withMessage('Street address is required'),
  check('city')
    .exists({ checkFalsy: true })
    .withMessage('City is required'),
  check('state')
    .exists({ checkFalsy: true })
    .withMessage('State is required'),
  check('country')
    .exists({ checkFalsy: true })
    .withMessage('Country is required'),
  check('lat')
    .isDecimal()
    .withMessage('Latitude is not valid'),
  check('lng')
    .isDecimal()
    .withMessage('Longitude is not valid'),
  check('name')
    .exists({ checkFalsy: true })
    .isLength({ max: 49 })
    .withMessage('Name must be less than 50 characters'),
  check('description')
    .exists({ checkFalsy: true }),
  check('price')
    .exists({ checkFalsy: true })
    .withMessage('Price per day is required'),
  handleValidationErrors
];



router.get('/current', async (req, res, next) => {
  const userId = req.user.dataValues.id;
  const Spots = await Spot.findAll({
    where: { ownerId: userId },
    include: [
      { model: Review, attributes: ['stars'] },
      { model: SpotImage, attributes: ['url'] }
    ]
  });
  let avgRating = 0;

  for (let i = 0; i < Spots.length; i++) {
    const url = Spots[i].dataValues.SpotImages;
    if (url.length) {
      Spots[i].dataValues.previewImage = url[0].dataValues.url;
    } else {
      Spots[i].dataValues.previewImage = null;
    }
    const rating = Spots[i].dataValues.Reviews;
    if (rating.length) {
      avgRating = 0;
      console.log("rating: ", rating[0].dataValues.stars)
      for (let j = 0; j < rating.length; j++) {
        avgRating += rating[j].dataValues.stars;
      }
      Spots[i].dataValues.avgRating = avgRating / rating.length;
    } else {
      Spots[i].dataValues.avgRating = null;
    }
    delete Spots[i].dataValues.Reviews;
    delete Spots[i].dataValues.SpotImages;
  }
  return res.json({ Spots })
});

router.post('/:spotId/bookings', validateBooking, async (req, res, next) => {
  const spot = await Spot.findOne({ where: { id: req.params.spotId} });
  if (!spot) {
    const err = new Error("Spot couldn't be found");
    return res.json(404,{
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }

  console.log(spot.dataValues.ownerId, req.user.id )
  if(spot.dataValues.ownerId === req.user.id) {
    const err = new Error("Owner cannot book spot")
    return res.json(403, {
      message: "Owner cant book spot"
    })
  }
  //booking conflict check
  const checkBooking = await Booking.findAll({where: {
    [Op.or]: [
    {startDate: {[Op.between]: [req.body.startDate, req.body.endDate]}},
    {endDate: {[Op.between]: [req.body.startDate, req.body.endDate]}}]
  }});
  //booking conflict error
  if (checkBooking.length) {
    const err = new Error("Booking conflict");
    return res.json(403, {
      "message": "Sorry, this spot is already booked for the specified dates",
      "statusCode": 403,
      "errors": [
        "Start date conflicts with an existing booking",
        "End date conflicts with an existing booking"
      ]
    })
  }

  const newBooking = await Booking.create({
    spotId: req.params.spotId,
    userId: req.user.id,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
  });

 // const newReview = await Review.findOne({ where: { userId: req.user.id, spotId: req.params.spotId } });
  return res.json(newBooking)

})


//create review for spot with spot id
router.post('/:spotId/reviews', validateReview, async (req, res, next) => {
  const spotId = req.params.spotId;
console.log("spot id: ", spotId)
  const spot = await Spot.findOne({ where: { id: req.params.spotId} });
  console.log("Spot: ", spot)
  if (!spot) {
    const err = new Error("Spot couldn't be found");
    return res.json(404,{
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }

  const checkReview = await Review.findAll({where:
    {spotId: req.params.spotId, userId: req.user.id}});
    console.log("checkReview: ",checkReview)
  if(checkReview.length) {
    const err = new Error('User already has a review for this spot');
    return res.json(403,{
      "message": "User already has a review for this spot",
      "statusCode": 403
    })
  }

  await Review.create({
    spotId: req.params.spotId,
    userId: req.user.id,
    review: req.body.review,
    stars: req.body.stars,
  });

  const newReview = await Review.findOne({ where: { userId: req.user.id, spotId: req.params.spotId } });
  return res.json(201, newReview)

});


// CREATE IMAGE FOR SPOT
router.post('/:spotId/images', async (req, res) => {
  const { spotId } = req.params.spotId;
  const checkSpot = await Spot.findOne({ where: { id: req.params.spotId } });
  if (!checkSpot) {
    return res.json(404, { message: "Spot couldn't be found", "statusCode": 404 })
  }

  const newSpotImage = await SpotImage.create({
    spotId: req.params.spotId,
    url: req.body.url,
    preview: req.body.preview
  });

  delete newSpotImage.dataValues.createdAt;
  delete newSpotImage.dataValues.updatedAt;
  delete newSpotImage.dataValues.spotId;

  return res.json(newSpotImage.dataValues)
});


router.put('/:spotId', validateSpot, async (req, res) => {
  const spot = await Spot.findOne({ where: { id: req.params.spotId } });
  if (!spot) {
    const err = new Error("Spot couldn't be found");
    err.statusCode = 404;
    return res.json(404,{
      "message": "Spot couldn't be found",
      "statusCode": 404
    })

  }
  spot.set({
    "address": req.body.address,
    "country": req.body.country,
    "city": req.body.city,
    "state": req.body.state,
    "lng": req.body.lng,
    "lat": req.body.lat,
    "name": req.body.name,
    "description": req.body.description,
    "price": req.body.price,
  });

  await spot.save();
  return res.json(spot)

})



router.get('/:spotId/reviews', async (req, res, next) => {
  const spot = await Spot.findOne({where: {id: req.params.spotId}});

  if (!spot) {
    return res.json(404, {
      message: "Spot couldn't be found",
      statusCode: 404
    })
  }

  const Reviews = await Review.findAll({
    where: {spotId: req.params.spotId},
    include: [
      {model: User, attributes: ['id', 'firstName', 'lastName']},
      {model: ReviewImage, attributes: ['id', 'url'] }
    ]
  })

  const returnReview = {Reviews}
  return res.json(returnReview)
})

router.get('/:spotId/bookings', async(req, res, next) => {
  const spot = await Spot.findOne({where: {id: req.params.spotId}});

  if (!spot) {
    return res.json(404, {
      message: "Spot couldn't be found",
      statusCode: 404
    })
  }

  let Bookings = {};
  if (req.user.id === spot.dataValues.ownerId) {
     Bookings = await Booking.findAll({
      where: {spotId: req.params.spotId},
      include: [{model: User, attributes: ['id', 'firstName', 'lastName']  }]
    });
  }else {
       Bookings = await Booking.findAll({
        where: {spotId: req.params.spotId},
        attributes: ['spotId', 'startDate', 'endDate']
      });
  }

  returnBookings = {Bookings}
  return res.json(returnBookings)
})

router.get('/:spotId', async (req, res) => {
  const spotId = req.params.spotId;
  const spot = await Spot.findOne({
    where: { id: spotId },
    include: [
      { model: SpotImage, attributes: ["id", "url", "preview"] },
      { model: User, attributes: ["id", "firstName", "lastName"] },
      { model: Review }
    ]
  });
  if (!spot) {
    return res.json(404, {
      message: "Spot couldn't be found",
      statusCode: 404
    })
  }

  spot.dataValues.Owner = spot.dataValues.User;

  spot.dataValues.numReviews = spot.dataValues.Reviews.length;

  if (spot.dataValues.Reviews.length) {
    let avg = 0;
    for (let i = 0; i < spot.dataValues.Reviews.length; i++) {
      avg += spot.dataValues.Reviews[i].dataValues.stars
    }

    spot.dataValues.avgStarRating = avg / spot.dataValues.Reviews.length;
  } else {
    spot.dataValues.avgStarRating = null;
  }

  delete spot.dataValues.User;
  delete spot.dataValues.Reviews;
  return res.json(spot)
});


router.get('/', async (req, res, next) => {

  const Spots = await Spot.findAll({
    include: [
      { model: Review, attributes: ['stars'] },
      { model: SpotImage, attributes: ['url'] }
    ]
  });
  // console.log("SPOOOOTSSSS:");
  // console.log("SPOTTTSSSS: ")
  // console.log(Spots)

  let avgRating = 0;
  //get url
  for (let i = 0; i < Spots.length; i++) {
    const url = Spots[i].dataValues.SpotImages;
    if (url.length) {
      Spots[i].dataValues.previewImage = url[0].dataValues.url;
    } else {
      Spots[i].dataValues.previewImage = null;
    }
    const rating = Spots[i].dataValues.Reviews;
    if (rating.length) {
      avgRating = 0;
      for (let j = 0; j < rating.length; j++) {
        avgRating += rating[j].dataValues.stars;
      }
      Spots[i].dataValues.avgRating = avgRating / rating.length;
    } else {
      Spots[i].dataValues.avgRating = null;
    }
    delete Spots[i].dataValues.Reviews;
    delete Spots[i].dataValues.SpotImages;
  }
  return res.json({ Spots })
});

router.post('/', validateSpot, async (req, res) => {
  const { user } = req;
  const userId = user.dataValues.id;
  const { address, city, state, country, lat, lng, name, description, price } = req.body;

  const newSpot = await Spot.create({
    ownerId: userId,
    address: address,
    city: city,
    state: state,
    country: country,
    lat: lat,
    lng: lng,
    name: name,
    description: description,
    price: price
  });
  let values = newSpot.dataValues;
  return res.json(201, newSpot.dataValues)
});




module.exports = router;
