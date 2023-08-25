"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("passport");
module.exports = (config, req, res, next) => {
    if (String(config.client).toLocaleLowerCase() == "local") {
        return passport.authenticate('local', { failureRedirect: '/login' }),
            function (req, res, next) {
                res.redirect('/local/callback');
            }(req, res, next);
    }
    passport.authenticate(config.client, { scope: config.scope, failWithError: true })(req, res, next);
};
