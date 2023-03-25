const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { ValidationError } = require('sequelize')

const router = express.Router();

const validateSignup = [
    check('firstName')
        .exists({checkFalsy: true})
        .withMessage('Please provide a first name.'),
    check('lastName')
        .exists({checkFalsy: true})
        .withMessage('Please provide a last name.'),
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
     handleValidationErrors
  ];

// Sign up
router.post(
    '/',
    validateSignup,
    async (req, res, next) => {

      const { firstName, lastName, email, password, username } = req.body;

      //check if user already exists with email
      const existingEmail = await User.findOne({ where: { email: email }});
      if (existingEmail) {
        const err = new Error('User already exists');
        err.status = 403;
        res.json(403,{
          message: err.message,
          statusCode: err.status,
          errors: [
            'User with that email already exists'
          ]
        })
      }

      //check if user already exists with username
      const existingUsername = await User.findOne({ where: { username: username }});
      if (existingUsername) {

        const err = new Error('User already exists');
        err.status = 403;
        res.json(403,{
          message: err.message,
          statusCode: err.status,
          errors: [
              "User with that username already exists"
          ]   // ??????? how to use errors array
        })
      }

      const user = await User.signup({ firstName, lastName, email, username, password });

      const token = await setTokenCookie(res, user);

      // const returnUser = user.toJSON();
      // delete returnUser.createdAt;
      // delete returnUser.updatedAt;
      // returnUser.token = token;
      console.log(user)
      user.dataValues.token = token;
      delete user.dataValues.createdAt;
      delete user.dataValues.updatedAt;


      return res.json(user);
    }
  );


module.exports = router;
