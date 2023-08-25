"use strict";
const passport = require("passport");
//serializig and deserializing module
module.exports = (() => {
    passport.serializeUser(function (user, done) {
        done(null, user);
    });
    passport.deserializeUser(function (user, done) {
        done(null, user);
    });
})();
