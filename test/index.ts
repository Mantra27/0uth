//@ts-ignore
import zerouth from '../lib/index';
import "../lib/middleware/_serial-d_serial";
const express = require("express")

const google = {
  client: 'google',
  client_id: 'google_client',
  redirect_url: 'http://localhost:3000/google/auth/callback',
};

const slack = {
  client: 'slack',
  client_id: 'slack_client',
};

const discord = {
  client: 'discord',
  redirect_url: 'http://localhost:3000/discord/auth/callback',
  client_id: 'discord_client',
};


// Use the oauthMiddleware with your Express.js or Fastify server
const app = express();

app.use(zerouth("/google", google))
app.use(zerouth("/slack", slack))
app.use(zerouth("/discord", discord))

app.listen(3000, () => {
  console.log("server live on port 3000")
})