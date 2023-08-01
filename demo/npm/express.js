const express = require("express");
const cors = require("cors");
const zerouth = require("0uth"); // 0uth 

const _port = process.env ?? 8080;

const app = express();
app.use(cors());

// Entry Point: http://localhost:8080/api/auth/google
app.use(
    zerouth("/auth/google", {
        client: "google", 
        //          ⬆ Available Strategies ⬇
        //Traditional, google, facebook, github, linkedin, twitter
        //microsoft, discord, slack, twitch, reddit,
        //spotify, gitlab, bitbucket, digitalocean, coinbase
        client_id: "your_client_id",
        client_secret: "your_client_secret", //optional
        redirect_uri: `http://localhost:${_port}/api/auth/callback`, //default fallback http://localhost:8080/{strategie_name}/callback
        scope: ["profile", "email"], //optional
    })
);

// A note that redirect_uri is optional, but it is recommended to use it.
// If you don't use it, the default fallback will be http://localhost:8080/{strategie_name}/callback
// Response payload (received on redirect_url) from the traditional strategy is customable, you can set that entry in your db and use it to authenticate the user.

app.listen(_port); //initiate express server