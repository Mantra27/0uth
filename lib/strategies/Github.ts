const GithubStrategy = require('passport-github2').Strategy;
const passport = require("passport");
import { OAuthConfig } from "../../Interface/config";

module.exports = (config:OAuthConfig) => {
    passport.use(new GithubStrategy({
        clientID: config.client_id,
        clientSecret: config.client_secret,
        callbackURL: config.redirect_url,
      },
      function(accessToken:any, refreshToken:any, profile:any, cb:any) {
        return cb(false, {accessToken: accessToken, refreshToken: refreshToken, profile: profile});
      }
    ));
}

export {}