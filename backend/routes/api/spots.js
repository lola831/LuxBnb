const express = require('express');
const { Op, json } = require("sequelize");
const { Spot, Review, SpotImage, User  } = require('../../db/models');
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
        console.log("ERRORS: ", errors)
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


router.get('/', async (req, res, next) => {
    const Spots = await Spot.findAll({
       include: [
        { model: Review, attributes: ['stars'] },
        { model: SpotImage, attributes: ['url'] }
       ]
    });
   // console.log("ALLSPOTSSSSS: ",allSpots)
    for (let i = 0; i < Spots.length; i++) {
        const rating = Spots[i].dataValues.Reviews[0].dataValues.stars;
        const image = Spots[i].dataValues.SpotImages[0].dataValues.url;
        Spots[i].dataValues.avgRating = rating;
        Spots[i].dataValues.previewImage = image;
        delete Spots[i].dataValues.Reviews;
        delete Spots[i].dataValues.SpotImages;
    }
    const allSpots = {Spots};
    return res.json(allSpots)
});

router.post('/', restoreUser,  async (req,res) => {
    const { user } = req;
   // console.log("UUUUUUSER: ")
    console.log(user)

    const userId = user.dataValues.id;
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    //console.log("USERRRRID: ", userId)
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
   // console.log("NEWWWSPOT: ",newSpot)
    let values = newSpot.dataValues;
   // console.log("vallluees:   ",values)

    return res.json( 201, {
        id: newSpot.id,
        ownerId: newSpot.ownerId,
        address: newSpot.address,
        city: newSpot.city,
        state: newSpot.state,
        country: newSpot.country,
        lat: newSpot.lat,
        lng: newSpot.lng,
        name: newSpot.name,
        description: newSpot.description,
        price: newSpot.price,
        createdAt: newSpot.createdAt,
        updatedAt: newSpot.updatedAt

    })

});

router.get('/current', async (req, res, next) => {
    const { id } = req.body.Spots[0].id;
    console.log("REQ PARAMSSSSSSS: ", id );

});


module.exports = router;
