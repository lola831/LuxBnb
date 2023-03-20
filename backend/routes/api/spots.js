const express = require('express');
const { Op, json } = require("sequelize");
const { Spot, Review, SpotImage, User, sequelize  } = require('../../db/models');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const handleValidation = (req, _res, next) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) { //checks if errors array is empty
      const errors = {};
      validationErrors
        .array()
        .forEach(error => errors[error.param] = error.msg);

      errors.message = "Validation Error";
      next(errors);
    }
    return json(errors)
  };

const validateSpotCreate = [
    check('address')
        .exists({checkFalsy: true})
        .withMessage('Street address is required'),
    check('city')
        .exists({checkFalsy: true})
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
      .isLength({ max: 49})
      .withMessage('Name must be less than 50 characters'),
    check('description')
      .exists({ checkFalsy: true }),
    check('price')
      .exists({ checkFalsy: true })
      .withMessage('Price per day is required'),
    handleValidation
  ];

  // CREATE IMAGE FOR SPOT
  router.post('/:spotId/images', async (req, res) => {
    const {spotId} = req.params.spotId;
    const checkSpot = await Spot.findOne({ where: { id: req.params.spotId}});
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

  router.get('/current', async (req, res, next) => {
    const userId = req.user.dataValues.id;
    const Spots = await Spot.findAll({
        where: { ownerId: userId},
        include: [
            { model: Review, attributes: ['stars'] },
            { model: SpotImage, attributes: ['url'] }
        ]
    });

    console.log("SPOTTTSSSS: ")
    console.log(Spots)

    let avgRating = 0;
    //get url
    for (let i = 0; i < Spots.length; i++) {
    const url = Spots[i].dataValues.SpotImages;
    if (url.length) {
        Spots[i].dataValues.previewImage = url[0].dataValues.url;
    }else {
        Spots[i].dataValues.previewImage = null;
    }
    const rating = Spots[i].dataValues.Reviews;
    if(rating.length) {
        avgRating = 0;
        for (let j = 0; j < rating.length; j++) {
            avgRating += rating[i].stars;
        }
        Spots[i].dataValues.avgRating = avgRating/rating.length;
    }else{
        Spots[i].dataValues.avgRating = null;
    }
      delete Spots[i].dataValues.Reviews;
      delete Spots[i].dataValues.SpotImages;
    }


    return res.json({Spots})

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
    }else {
        Spots[i].dataValues.previewImage = null;
    }
    const rating = Spots[i].dataValues.Reviews;
    if(rating.length) {
        avgRating = 0;
        for (let j = 0; j < rating.length; j++) {
            avgRating += rating[j].dataValues.stars;
        }
        Spots[i].dataValues.avgRating = avgRating/rating.length;
    }else{
        Spots[i].dataValues.avgRating = null;
    }
      delete Spots[i].dataValues.Reviews;
      delete Spots[i].dataValues.SpotImages;
    }
    return res.json({Spots})
});

router.post('/', async (req,res) => {
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
    return res.json( 201, newSpot.dataValues)
});




module.exports = router;
