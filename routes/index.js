var express = require('express');
var router = express.Router();
const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  // res.redirect('/home');
});

router.get('/auth/google', passport.authenticate(
  'google',
{
  scope: ['profile', 'email'],

  prompt: 'select_account'
}  
));

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/days',
    failureRedirect: '/'
  }
))

module.exports = router;
