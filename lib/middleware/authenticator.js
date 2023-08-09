"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("passport");
module.exports = (config, req, res, next) => {
    passport.authenticate(config.client, { scope: config.scope })(req, res, next);
};
