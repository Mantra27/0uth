//@ts-ignore
import passport from "passport"
import { OAuthConfig } from "../../Interface/config";

const CallbackHandler = (config: OAuthConfig, req:any, res:any) => {
    //@ts-ignore

    const callBack = (string:any) => {
    //we're not handling string parameter rn
    //@ts-ignore
        return res.redirect(`/${String(config.success_redirect).split("/")[1].trim()}`)
    };
    
    passport.authenticate(config.client, { failureRedirect: config.failure_redirect })(req, res, (error:any) => callBack(error))

};

module.exports = CallbackHandler;