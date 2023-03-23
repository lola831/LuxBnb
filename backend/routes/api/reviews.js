const express = require('express');
const { Op, json } = require("sequelize");
const { Spot, Review, ReviewImage, User, SpotImage, sequelize  } = require('../../db/models');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { ValidationError } = require('sequelize');
const e = require('express');



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


router.get('/current', async(req,res,next) => {

    const Reviews = await Review.findAll({
        where: {userId: req.user.id},
        include: [
            {model: User, attributes: ['id', 'firstName', 'lastName']},
            {model: Spot, attributes: ['id', 'ownerId','address', 'city',
            'state', 'country', 'lat', 'lng', 'name', 'price'],
            include: [{model: SpotImage, attributes: ['url']}] },
            {model: ReviewImage, attributes: ['id', 'url']}
        ]
    });

    for (let i = 0; i < Reviews.length; i++) {
        let url = Reviews[i].dataValues.Spot.SpotImages[0].dataValues.url;
        Reviews[i].dataValues.Spot.dataValues.previewImage = url;
        delete Reviews[i].dataValues.Spot.dataValues.SpotImages;
    }
    const returnReviews = {Reviews}
    return res.json(returnReviews)
})

router.post('/:reviewId/images', async(req, res, next) => {


    const review = await Review.findByPk(req.params.reviewId);

    if (!review) {
        const err = new Error("Review couldn't be found");
        return res.json(404,{
            "message": "Review couldn't be found",
            "statusCode": 404
        })
    }

    console.log("REVIEW USERID: ", review.userId)


    const imagesOfReviews = await ReviewImage.findAll({ where: { reviewId: req.params.reviewId}});
    console.log(imagesOfReviews)
    if (imagesOfReviews.length > 9) {
        const err = new Error("Review couldn't be found");
        err.statusCode = 403;
        return res.json(403,{
            "message": "Maximum number of images for this resource was reached",
            "statusCode": 403
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
});

router.put('/:reviewId', validateReview, async (req, res, next) => {
    const review = await Review.findByPk(req.params.reviewId);

    if(!review) {
        const err = new Error("Review couldn't be found");
        return res.json(404,
            {"message": "Review couldn't be found",
            "statusCode": 404}
        )
    }

   if(!(review.dataValues.userId === req.user.id)) {
    const err = new Error("Review must belong to current user");
    return res.json(403,{
        "message": "Review must belong to current user",
        "statusCode": 403
    })
   }

   return res.json(review)


})




module.exports = router;
