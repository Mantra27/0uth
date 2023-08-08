//@ts-ignore
import zerouth from '../lib/index';
import "../lib/middleware/_serial-d_serial";
const express = require("express")

const google = {
  client: 'google',
  client_id: '1014276340059-orscm84ijkimm5vp5qkemp1kmjl4cvpe.apps.googleusercontent.com',
  redirect_url: '/google/callback',
  client_secret: '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',
  success_redirect: '/success',
  failure_redirect: '/login',
  scope: ["email", "profile"]
};

const discord = {
  client: 'discord',
  client_id: '1138425053659279452',
  redirect_url: '/auth/dsc',
  client_secret: 'EFSd6dcuqUbmbobXR8V_v1XOkaDJLsd7',
  success_redirect: '/discord/success',
  failure_redirect: '/login',
  scope: ['identify', 'email', 'guilds', 'guilds.join']
};

const reddit = {
  client: 'reddit',
  client_id: '2d0aOJ2LgNJ1g0Vb7o735Q',
  redirect_url: '/reddit/callback',
  client_secret: 'p_74ZvDRIlvJqAsvIRjE_v4iOyaI3g',
  success_redirect: '/success',
  failure_redirect: '/login',
};


// Use the oauthMiddleware with your Express.js or Fastify server
const app = express();
const passport = require("passport");

app.use(require("express-session")({ secret: 'SECRET' , resave: true, saveUninitialized: true}))
app.use(passport.initialize())
app.use(passport.session())

app.use(zerouth("/google", google))
app.use(zerouth("/discord", discord))
app.use(zerouth("/reddit", reddit))



app.get("/", (req:any, res:any)=>{
  res.send(req.user)
});

app.get("/success", (req:any, res:any)=>{
  res.send(req.user)
})

app.listen(3000, () => {
  console.log("server live on port 3000")
});