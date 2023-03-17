const express = require('express');
const { Op } = require("sequelize");
const { Spot, Review, SpotImage  } = require('../../db/models');

const router = express.Router();



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


module.exports = router;
