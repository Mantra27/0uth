"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DiscordStrategy = require('passport-discord').Strategy;
const passport = require("passport");
module.exports = (config) => {
    passport.use(new DiscordStrategy({
        clientID: config.client_id,
        clientSecret: config.client_secret,
        callbackURL: config.redirect_url,
        scope: config.scope
    }, function (accessToken, refreshToken, profile, cb) {
        return cb(false, { accessToken: accessToken, refreshToken: refreshToken, profile: profile });
    }));
};