//@ts-ignore
import zerouth from '../lib/index';
import "../lib/middleware/_serial-d_serial";
const express = require("express")

const github = {
  client: 'github',
  client_id: '250087077892987',
  redirect_url: '/github/callback',
  client_secret: '5198bb87eb2c7faae3f409c6bea4e902',
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
app.use(zerouth("/facebook", facebook))


app.get("/", (req:any, res:any)=>{
  res.send(req.user)
});

app.get("/success", (req:any, res:any)=>{
  res.send(req.user)
})

app.listen(3000, () => {
  console.log("server live on port 3000")
});