const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require('./spots.js');
const reviewsRouter = require('./reviews.js');
const { restoreUser } = require("../../utils/auth.js");

router.use(restoreUser); // all routes get passed through this global middleware first (utils/auth.js)

//log-in(creates session), log-out(ends session)
router.use('/session', sessionRouter);

//sign up
router.use('/users', usersRouter);

//spots
router.use('/spots', spotsRouter);

router.use('/reviews', reviewsRouter);

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

//   // GET /api/set-token-cookie
// const { setTokenCookie } = require('../../utils/auth.js');
// const { User } = require('../../db/models');
// router.get('/set-token-cookie', async (_req, res) => {
//   const user = await User.findOne({
//       where: {
//         username: 'Demo-lition'
//       }
//     });
//   setTokenCookie(res, user);
//   return res.json({ user: user });
// });

// router.get(
//   '/restore-user',
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

// //checks if user is logged in to view certain stuff?
// // GET /api/require-auth
// const { requireAuth } = require('../../utils/auth.js'); //import this where you want to use this middleware
// router.get(
//   '/require-auth',
//   requireAuth,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

module.exports = router;
