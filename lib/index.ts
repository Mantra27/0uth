//global types and interfaces
import {OAuthConfig} from "../Interface/config";
const passport = require("passport");

type Path = string; // "/*", "/<strat>"

  //globals declaration, will be used for integrity
  const globals = require("./utils/globals");

  //handle after successful reqs
  const callBack = require("../lib/middleware/callback");

  //beta phase has 16 popular pp clients only
  const _clients : Array<string> = 
  [
    "traditinal", "google", "facebook",
    "github", "linkedin", "twitter",
    "microsoft", "discord", "slack",
    "twitch", "reddit", "spotify",
    "gitlab", "bitbucket", "digitalocean",
    "coinbase"
  ];

  //importing all the strategies
  // const [
  //   GOOGLE, DISCORD, SLACK,
  //   TRADITIONAL, GITHUB, FACEBOOK,
  //   LINKEDIN, TWITTER, MICROSOFT,
  //   TWITCH, REDDIT, SPOTIFY,
  //   GITLAB, BITBUCKET, DIGITALOCEAN,
  //   COINBASE
  // ] = [
  //   require("./strategies/Google"), require("./strategies/Discord"), require("./strategies/Slack"),
  //   require("./strategies/Traditional"), require("./strategies/Github"), require("./strategies/Facebook"),
  //   require("./strategies/Linkedin"), require("./strategies/Twitter"), require("./strategies/Microsoft"),
  //   require("./strategies/Twitch"), require("./strategies/Reddit"), require("./strategies/Spotify"),
  //   require("./strategies/Gitlab"), require("./strategies/Bitbucket"), require("./strategies/Digitalocean"),
  //   require("./strategies/Coinbase")
  // ];
  
  const strategy = require("./imports/strategies");
  //serial-d_serial is a middleware that will be used to serialize and deserialize while authentication
  require("../lib/middleware/_serial-d_serial");

  //auth is a middleware that will be used to authenticate the user ()
  const auth = require("./middleware/authenticator");
  

  //zerouth is the main function that will be exported
  const core:Function = (path: Path, config: OAuthConfig) => {

      //side cases
      const keysToCompare: (keyof OAuthConfig)[] = ["success_redirect", "failure_redirect", "redirect_url"];
      
      for (const externalIterator of keysToCompare) {
          for (const internalIterator of keysToCompare) {
              if ((config[externalIterator] === config[internalIterator] && externalIterator !== internalIterator) || String(path) === String(config[externalIterator]) || String(path) === String(config[internalIterator])) {
                throw new Error(`zerouth: auth path (${path}), success_redirect (${config.success_redirect}), failure_redirect (${config.failure_redirect}) and redirect_url (${config.redirect_url}) should be unique from eachother`)
              }
          }
      }
  
    if(!config.redirect_url)
      throw new Error("zerouth: redirect_url is required")
    if(String(path).split("")[0] !== "/")
      throw new Error(`zerouth: path should start with a '/', but we got '${String(path).split("")[0]}'`)
    if(String(config.redirect_url).includes("//") || String(config.redirect_url).includes("http") || String(config.redirect_url).includes("https") || String(config.redirect_url).includes("www"))
      throw new Error("zerouth: redirect_url should not contain any protocol or subdomain, only path is allowed (try removing http://, https:// etc)")
    if(String(config.redirect_url).split("")[0] !== "/")
      throw new Error(`zerouth: redirect_url should start with a '/', but we got '${String(config.redirect_url).split("")[0]}'`)
    if(String(config.success_redirect).split("")[0] !== "/")
      throw new Error(`zerouth: success_redirect should start with a '/', but we got '${String(config.success_redirect).split("")[0]}'`)
    if(String(config.failure_redirect).split("")[0] !== "/")
      throw new Error(`zerouth: failure_redirect should start with a '/', but we got '${String(config.failure_redirect).split("")[0]}'`)

    //path, client, client_id, redirect_url, client_secret integrity check

    //PATH
    globals.path.includes(String(path))
    ? (() => {
        throw new Error(`Error: path ${path} already in use`);
      })()

      //CLIENT
  : globals.client.includes(config.client)
    ? (() => {
        throw new Error(`Error: client ${config.client} already in use`);
      })()

      //CLIENT_ID
  : globals.client_id.includes(config.client_id)
    ? (() => {
        throw new Error(`Error: client_id ${config.client_id} already in use`);
      })()

      //REDIRECT_URL
  : globals.redirect_url.includes(config.redirect_url)
    ? (() => {
        throw new Error(`Error: redirect_url ${config.redirect_url} already in use`);
      })()

      //CLIENT_SECRET
  : (globals.client_secret.includes(config.client_secret) && config.client_secret !== undefined)
    ? (() => {
        throw new Error(`Error: client_secret ${config.client_secret} already in use`);
      })()

      //every condition passes
  : (() => {

        globals.path.push(path);
        globals.client.push(config.client);
        globals.client_id.push(config.client_id);
        globals.redirect_url.push(config.redirect_url || `/${config.client}/callback?code=fallback_default`);
        globals.client_secret.push(config.client_secret || null);

      })();

    return async (req:any, res:any, next:any) => {

      //[side cases]
      //side case if zerouth is not being used as a express/http/fastify middleware
      if(req === undefined || res === undefined) throw new Error("zerouth is not being used as a express/http/fastify middleware")
      if(req.url === "/favicon.ico") return next(); //favicon request will be ignored

      //request management
      if(String(req.url).split("?")[0] === String(config.redirect_url)){
        await callBack(config, req, res, next);
        return;
      }

      //user requesting to access to OAuth point
      else if(String(path) === String(req.url)){

        // if(String(req.method) === "GET") return res.send("error: zerouth: GET request is not supported, send a POST(form-encode) request on the same endpoint instead.")

        //client validation (undefined and from valid options only)
        if(config.client === undefined) return res.status(501).send({status: 501, error: `zerouth: client is not defined`, t: new Date().toTimeString()});
        
        if(_clients.includes(String(config.client)) === false) return res.status(501).send({status: 501, error: `zerouth: client is not valid`, provided_client: config.client, valid_clients: _clients, t: new Date().toTimeString()});

        //core
        else
        {
          const _:OAuthConfig = config;

          //setting the default fallback redirect_url
          _.redirect_url = config.redirect_url || `${req.protocol}://${req.get('host')}${req.url}${_.client}/callback?code=fallback_default`;

          switch (String(_.client)) {
            case "google":
              
              //Google OAuth format client_id, client_secret, redirect_url
              strategy.Google(_);
              auth(_, req, res, next);
              break;

            case "discord":
              strategy.Discord(_);
              auth(_, req, res, next);
              break;

            case "reddit":
              strategy.Reddit(_);
              auth(_, req, res, next);
              break;

            default:
              res.status(501).send({status: 501, error: `zerouth: client ${_.client} is not supported yet`, t: new Date().toTimeString()});
              break;
          }

        }
      }
      
      //if zerouth path does not match current request endpoint or /favicon.ico
      else return next();
    };
  };
  
export = core;
  