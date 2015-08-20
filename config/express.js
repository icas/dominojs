var passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy;

module.exports.http = {
  customMiddleware: function (app) {
    passport.use(new FacebookStrategy({
      clientID: sails.config.application_auth.facebookClientID,
      clientSecret: sails.config.application_auth.facebookClientSecret,
      callbackURL: sails.config.application_auth.facebookCallbackURL,
      profileFields: ['id', 'displayName', 'photos']
    }, verifyHandler));
    app.use(passport.initialize());
    app.use(passport.session());
  }
}

passport.serializeUser(function (user, done) {

    // console.log("serializeUser", user);
  done(null, user.uid);
});

passport.deserializeUser(function (uid, done) {

    // console.log("deserializeUser", uid);
  User.findOne({uid: uid}, function (err, user) {
    done(err, user);
  });
});

var verifyHandler = function (token, tokenSecret, profile, done) {
  console.log(profile.photos[0].value);
  process.nextTick(function () {

    // console.log("=> verifyHandler with ", token, tokenSecret);
    User.findOne({uid: profile.id}, function (err, user) {
      if (user) {
        return done(null, user);
      } else {

        var data = {
          provider: profile.provider,
          uid: profile.id,
          name: profile.displayName,
          imageURL: profile.photos[0].value
        };

        if (profile.emails && profile.emails[0] && profile.emails[0].value) {
          data.email = profile.emails[0].value;
        }
        if (profile.name && profile.name.givenName) {
          data.firstname = profile.name.givenName;
        }
        if (profile.name && profile.name.familyName) {
          data.lastname = profile.name.familyName;
        }

        User.create(data, function (err, user) {
          return done(err, user);
        });
      }
    });
  });
};
