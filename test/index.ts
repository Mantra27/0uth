//@ts-ignore
import zerouth from '../lib/index';
import "../lib/middleware/_serial-d_serial";
const express = require("express")

// const slack = {
//   client: 'slack',
//   client_id: 'slack_client',
// };

// const discord = {
//   client: 'discord',
//   redirect_url: 'http://localhost:3000/discord/auth/callback',
//   client_id: 'discord_client',
// };


const google = {
  client: 'google',
  client_id: '1014276340059-orscm84ijkimm5vp5qkemp1kmjl4cvpe.apps.googleusercontent.com',
  redirect_url: '/google/callback',
  client_secret: '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',
  success_redirect: '/success',
  failure_redirect: '/login',
  scope: ["email", "profile"]
};

// Use the oauthMiddleware with your Express.js or Fastify server
const app = express();
const passport = require("passport");

app.use(require("express-session")({ secret: 'SECRET' , resave: true, saveUninitialized: true}))
app.use(passport.initialize())
app.use(passport.session())

app.use(zerouth("/auth", google))

app.get("/", (req:any, res:any)=>{
  console.log(req.user);
  res.send(req.user)
});

app.get("/success", (req:any, res:any)=>{
  console.log(req.user)
  res.send(req.user)
})

app.listen(3000, () => {
  console.log("server live on port 3000")
});