"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//@ts-ignore
const passport_1 = __importDefault(require("passport"));
const CallbackHandler = (config, req, res) => {
    //@ts-ignore
    const callBack = (string) => {
        //we're not handling string parameter rn
        //@ts-ignore
        return res.redirect(`${String(config.success_redirect)}`);
    };
    passport_1.default.authenticate(config.client, { failureRedirect: config.failure_redirect })(req, res, (error) => callBack(error));
};
module.exports = CallbackHandler;
