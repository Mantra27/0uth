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

const facebook = {
  client: 'facebook',
  client_id: '250087077892987',
  redirect_url: '/facebook/callback',
  client_secret: '5198bb87eb2c7faae3f409c6bea4e902',
  success_redirect: '/success',
  failure_redirect: '/login',
};

const github = {
  client: 'github',
  client_id: 'Iv1.6125f961d1c5713a',
  redirect_url: '/github/callback',
  client_secret: '3ac3bcf26b1d0508062095f9c281cc621f068e33',
  success_redirect: '/success',
  failure_redirect: '/login',
};


const linkedin = {
  client: 'linkedin',
  client_id: '77jjghcszspky1',
  redirect_url: '/linkedin/callback',
  client_secret: '866BsKnlU6YKZaLA',
  success_redirect: '/linkedin/success',
  failure_redirect: '/login',
  scope: ['r_emailaddress', 'r_liteprofile'],
}

const twitch = {
  client: 'twitch',
  client_id: 'acb3s9saehs0s2bb8xmjcteyg33mzg',
  redirect_url: '/twitch/callback',
  client_secret: '93yglm1w272escolgp7kd5uelvc7mh',
  success_redirect: '/twitch/success',
  failure_redirect: '/login',
  scope: "user_read"
}

const spotify = {
  client: 'spotify',
  client_id: '8dfb7bd800a54879b66d7b21a11286db',
  redirect_url: '/spotify/callback',
  client_secret: 'aa93ee6060d74a9fa26cc3f3fb4603aa',
  success_redirect: '/spotify/success',
  failure_redirect: '/login',
}


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
app.use(zerouth("/github", github))
app.use(zerouth("/linkedin", linkedin))
app.use(zerouth("/twitch", twitch))
app.use(zerouth("/spotify", spotify))



app.get("/", (req:any, res:any)=>{
  res.send(req.user)
});

app.get("/success", (req:any, res:any)=>{
  res.send(req.user)
})

app.listen(3000, () => {
  console.log("server live on port 3000")
});