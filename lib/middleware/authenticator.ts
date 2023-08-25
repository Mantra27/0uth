const passport = require("passport");
import { OAuthConfig } from "../../Interface/config";

module.exports = (config: OAuthConfig, req:any, res:any, next: Function) => {
    if(String(config.client).toLocaleLowerCase() == "local"){
        return passport.authenticate('local', { failureRedirect: '/login' }),
        function(req:any, res:any, next: Function) {
          res.redirect('/local/callback');
        }(req, res, next);
    }

    passport.authenticate(config.client, { scope: config.scope, failWithError: true})(req, res, next);
}
