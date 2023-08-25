var LocalStrategy = require('passport-local')
const passport = require("passport");
import { OAuthConfig } from "../../Interface/config";

module.exports = (config:OAuthConfig, req:any, res:any) => {
    passport.use(new LocalStrategy((username:any, password:any, done:any) => {
        //@ts-ignore

        const response = config.cb(req, res, (status:any, result:any) => {return {status: status, result: result}})
        console.log({"status":response.status, "result":response.result})
        if(response.status == null) {
            return done(null, response.result);
        }
        return done(response.status, null, null);

    }));
}


export {}