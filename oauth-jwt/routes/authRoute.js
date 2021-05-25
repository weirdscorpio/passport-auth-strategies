const { Router } = require('express');
const authController = require('../controllers/authController')
const passport = require('passport');
const router = Router()

router.get('/login', authController.getLogin)

router.get('/google', passport.authenticate('google', {
  scope:['profile', 'email']
}))

router.get('/google/redirect', passport.authenticate('google'), authController.getAuthRedirect)

router.get('/loggedIn',passport.authenticate('jwt', {session: false, failureRedirect: "/users/login"}),  authController.getLoggedIn)

router.post('/logout',passport.authenticate('jwt', {session: false, failureRedirect: "/users/login"}),  authController.postLogOut)

module.exports = router