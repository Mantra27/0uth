"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SpotifyStrategy = require('passport-spotify').Strategy;
const passport = require("passport");
module.exports = (config) => {
    passport.use(new SpotifyStrategy({
        clientID: config.client_id,
        clientSecret: config.client_secret,
        callbackURL: config.redirect_url
    }, function (accessToken, refreshToken, profile, cb) {
        return cb(false, { accessToken: accessToken, refreshToken: refreshToken, profile: profile });
    }));
};
