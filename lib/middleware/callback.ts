const passport = require("passport");
import { OAuthConfig } from "../../Interface/config";

module.exports = (config: OAuthConfig, req:any, res:any, next: Function) => {
    console.log("authenticating");
    ((req, res, next)=>{
        passport.authenticate("google", { failureRedirect: '/login' }),
        function(req:any, res:any) {
            res.redirect('/from-module');
        }
    })(req, res, next)
}
