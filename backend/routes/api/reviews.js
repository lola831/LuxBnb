const express = require('express');
const { Op, json } = require("sequelize");
const { Spot, Review, ReviewImage, User, sequelize  } = require('../../db/models');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { ValidationError } = require('sequelize')



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


router.post('/:reviewId/images', async(req, res, next) => {

    const review = await Review.findOne({where: {id: req.params.reviewId}});

    if (!review) {
        const err = new Error("Review couldn't be found");
        err.statusCode = 404;
        return res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
        })
    }

    const imagesOfReviews = await ReviewImage.findAll({ where: { reviewId: req.params.reviewId}});
    console.log(imagesOfReviews)
    if (imagesOfReviews.length > 9) {
        const err = new Error("Review couldn't be found");
        err.statusCode = 403;
        return res.json({
            "message": "Maximum number of images for this resource was reached",
            "statusCode": 404
        })
    }

    await ReviewImage.create({
        reviewId: req.params.reviewId,
        url: req.body.url
    });

    const newReviewImage = await ReviewImage.findOne({ where: {
        reviewId: req.params.reviewId,
        url: req.body.url
    }});


   // console.log(newReviewImage)
    delete newReviewImage.dataValues.createdAt;
    delete newReviewImage.dataValues.updatedAt;
    delete newReviewImage.dataValues.reviewId;

    return res.json(newReviewImage)


})




module.exports = router;
