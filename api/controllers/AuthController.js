/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var passport = require('passport');

module.exports = {
	facebook: function(req, res){
    console.log("+ AUTH.FACEBOOK");
    passport.authenticate('facebook', {failureRedirect: '/'}, function (err, user) {
      console.log("Facebook Auth Response error=", err, "user=", user);
      if (user) {
        req.logIn(user, function (err) {
          if (err) {
            console.log("Auth Error", err);
            return res.view('500');
          }
          return res.redirect('/dashboard');
        });
      } else {
        return res.redirect('/');
      }

    })(req, res);
  },

  logout: function(req, res){
    console.log("+ AUTH.LOGOUT");
    req.logout();
    return res.redirect('/');
  }
};

