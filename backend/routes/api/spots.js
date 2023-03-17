const express = require('express');
const { Op } = require("sequelize");
const { Spot, Review, SpotImage  } = require('../../db/models');

const router = express.Router();



router.get('/', async (req, res, next) => {
    const allSpots = await Spot.findAll({
       include: [
        { model: Review, attributes: ['stars'] },
        { model: SpotImage, attributes: ['url'] }
       ]
    });
    //console.log(allSpots)

   const rating = allSpots[0].dataValues.Reviews[0].dataValues.stars;
   const image = allSpots[0].dataValues.SpotImages[0].dataValues.url;


    //console.log(allSpots[0].dataValues.Reviews[0].dataValues.stars);
    allSpots[0].dataValues.avgRating = rating;
    delete allSpots[0].dataValues.Reviews;
    allSpots[0].dataValues.previewImage = image;
    delete allSpots[0].dataValues.SpotImages;
    //const Spots = {};



    return res.json(allSpots)
});


module.exports = router;
