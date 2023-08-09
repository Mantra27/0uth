"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GithubStrategy = require('passport-github2').Strategy;
const passport = require("passport");
module.exports = (config) => {
    passport.use(new GithubStrategy({
        clientID: config.client_id,
        clientSecret: config.client_secret,
        callbackURL: config.redirect_url,
    }, function (accessToken, refreshToken, profile, cb) {
        return cb(false, { accessToken: accessToken, refreshToken: refreshToken, profile: profile });
    }));
};
