"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LocalStrategy = require('passport-local');
const passport = require("passport");
module.exports = (config, req, res) => {
    passport.use(new LocalStrategy((username, password, done) => {
        //@ts-ignore
        const response = config.cb(req, res, (status, result) => { return { status: status, result: result }; });
        console.log({ "status": response.status, "result": response.result });
        if (response.status == null) {
            return done(null, response.result);
        }
        return done(response.status, null, null);
    }));
};
