"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RedditStrategy = require("@r1oga/passport-reddit").Strategy;
const passport = require("passport");
module.exports = (config) => {
    passport.use(new RedditStrategy({
        clientID: config.client_id,
        clientSecret: config.client_secret,
        callbackURL: config.redirect_url,
    }, function (accessToken, refreshToken, profile, cb) {
        return cb(false, { accessToken: accessToken, refreshToken: refreshToken, profile: profile });
    }));
};
