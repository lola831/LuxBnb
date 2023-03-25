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

    const reviewImage = await ReviewImage.findOne({
        where: {id: req.params.imageId}
    });
    console.log("here", reviewImage)

    if(!reviewImage) {
        return res.json(404, {
            message: "Review Image couldn't be found",
            statusCode: 404
          })
    };

    const review = await Review.findOne({where: {id: reviewImage.dataValues.reviewId}});
    const userId = review.dataValues.userId;
    console.log("reviewId: ", reviewImage.dataValues.reviewId)
    console.log("userId: ", userId)
    console.log("User: ", req.user.id)

    if(!(req.user.id === userId)) {
        const err = new Error('spot must belong to user');
        return res.json(403,{
            "message": "review must belong to user"
        })
    }

    await reviewImage.destroy();

    return res.json({
        "message": "Successfully deleted",
        "statusCode": 200
      });
})



module.exports = router;
