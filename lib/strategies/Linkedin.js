"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const passport = require("passport");
module.exports = (config) => {
    passport.use(new LinkedInStrategy({
        clientID: config.client_id,
        clientSecret: config.client_secret,
        callbackURL: config.redirect_url,
        scope: config.scope
    }, function (accessToken, refreshToken, profile, cb) {
        return cb(false, { accessToken: accessToken, refreshToken: refreshToken, profile: profile });
    }));
};
