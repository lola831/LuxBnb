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


router.delete('/:imageId', async (req, res, next) => {
    const spotImage = await SpotImage.findOne({
        where: {id: req.params.imageId},
    });

    if(!spotImage) {
        return res.json(404, {
            message: "Spot Image couldn't be found",
            statusCode: 404
          })
    };

    const spot= await Spot.findOne({where: {id: spotImage.dataValues.spotId}});
    const ownerId = spot.dataValues.ownerId;


    if(!(req.user.id === ownerId)) {
        const err = new Error('spot must belong to user');
        return res.json(403,{
            "message": "spot must belong to owner"
        })
    }

    await spotImage.destroy();

    return res.json({
        "message": "Successfully deleted",
        "statusCode": 200
      });
})




module.exports = router;
