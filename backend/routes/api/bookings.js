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


router.get('/current', async (req, res, next) => {
    const Bookings = await Booking.findAll({
        where: {userId: req.user.id},
        include: [
            {model: Spot, attributes:
                {exclude: ['description', 'createdAt', 'updatedAt']},
                include: [{model: SpotImage, attributes: [['url', 'previewImage']]}]
            },
        ]
    });
    if(Bookings.length) {
      Bookings.forEach(booking => {
        booking.dataValues.Spot.dataValues.previewImage = booking.dataValues.Spot.dataValues.SpotImages[0].dataValues.previewImage;
         delete booking.dataValues.Spot.dataValues.SpotImages;
      })
    }

    const returnBookings = {Bookings};
    return res.json(returnBookings)
});

router.put('/:bookingId', validateBooking, async (req, res, next) => {

    const booking = await Booking.findOne({where: {id: req.params.bookingId}});

    if (!booking) {
        const err = new Error("Booking couldn't be found");
        return res.json(404,{
          "message": "Spot couldn't be found",
          "statusCode": 404
        })
      }

   if (!(booking.dataValues.userId === req.user.id)) {
    return res.json(403, {
        message: "Unauthorized User",
        statusCode: 403
      })
   }

   let date = new Date();
   //booking is in the past
   if (date > req.body.endDate){
    const err = new Error("Past bookings cant be modified")
    return res.json(403,
        {
            "message": "Past bookings can't be modified",
            "statusCode": 403
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

  booking.set({
    "startDate": req.body.startDate,
    "endDate": req.body.endDate
  });

  await booking.save();
  return res.json(booking)

})

router.delete('/:bookingId', async (req, res, next) => {
  const booking = await Booking.findOne({where: {id: req.params.bookingId}});


  if(!booking) {
    return res.json(404, {
        message: "Booking couldn't be found",
        statusCode: 404
      })
  }

  const startDate = booking.dataValues.startDate;
  let date = new Date();
if(startDate <= date) {
  const err = new Error("Bookings that have been started can't be deleted");
  res.status(403)
  return res.json(
    {
      "message": "Bookings that have been started can't be deleted",
      "statusCode": 403
    })
}

const bookingUser = booking.dataValues.userId;
const spot = await Spot.findOne({where: {id: booking.dataValues.spotId }});
const owner = spot.dataValues.ownerId;

if(req.user.id === owner || req.user.id === bookingUser) {

await booking.destroy();

return res.json({
    "message": "Successfully deleted",
    "statusCode": 200
  });
}
const err = new Error("You are not authorized to delete the booking");
res.status(403)
return res.json(
  {
    "message": "You are not authorized to delete the booking",
    "statusCode": 403
  })

})






module.exports = router;
