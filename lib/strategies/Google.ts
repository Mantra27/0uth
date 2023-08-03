const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require("passport");

module.exports = (GOOGLE_CLIENT_ID:String, GOOGLE_CLIENT_SECRET:String, callbackURL:String) => {
  console.log("google oauth initialized")
    passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: callbackURL
      },
      function(accessToken:any, refreshToken:any, profile:any, cb:any) {
        return cb(false, {accessToken: accessToken, refreshToken: refreshToken, profile: profile});
      }
    ));
}

export {}