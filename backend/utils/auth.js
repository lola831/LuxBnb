const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User } = require('../db/models');

const { secret, expiresIn } = jwtConfig;

// Sends a JWT Cookie
const setTokenCookie = (res, user) => {
    // Create the token.
    const token = jwt.sign(
      { data: user.toSafeObject() }, //payload
      secret,
      { expiresIn: parseInt(expiresIn) } // 604,800 seconds = 1 week
    );

    const isProduction = process.env.NODE_ENV === "production";

    // Set the token cookie
    res.cookie('token', token, {
      maxAge: expiresIn * 1000, // maxAge in milliseconds
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction && "Lax"
    });

    return token;
  };


  // global middleware: every request we get passed through restoreUser middleware
  const restoreUser = (req, res, next) => { //goals of this middleware: A.finds wherther or not we have a token attached to a request and B. if we do, find that user
    //existence of that jwt determines whether or not we have a logged-in user & we want to be able to access info of that user (so we attach that info to the user with req.user)

    // token parsed from cookies
    const { token } = req.cookies;
    req.user = null;

    return jwt.verify(token, secret, null, async (err, jwtPayload) => {
      if (err) {   //hits if we dont have a token cookie or other issue
        return next();
      }

      try {
        const { id } = jwtPayload.data;         //deconstructing id from jwt
        req.user = await User.scope('currentUser').findByPk(id); //making sure that the user id from jwt exists
      } catch (e) { //if user not found
        res.clearCookie('token');  //clear token cookies from this req/res
        return next();
      }

      if (!req.user) res.clearCookie('token'); //checking to see if  there is no current user then clear token cookies

      return next();
    });
  };

// If there is no current user, return an error
const requireAuth = function (req, _res, next) {
    if (req.user) return next();    //check if theres a req.user from above middleware
                                    //if yes, we know we have a valid logged-in user

    const err = new Error('Authentication required'); // if logged-put user, they'll be told to log in
    err.title = 'Authentication required';
    err.errors = { message: 'Authentication required' };
    err.status = 401;
    return next(err);
  }

module.exports = { setTokenCookie, restoreUser, requireAuth };
