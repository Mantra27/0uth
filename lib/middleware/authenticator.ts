const passport = require("passport");
import { OAuthConfig } from "../../Interface/config";

module.exports = (config: OAuthConfig, req:any, res:any, next: Function) => {
    passport.authenticate(config.client, { scope: config.scope })(req, res, next);
}
