//import
const Google = require("../strategies/Google");
const Discord = require("../strategies/Discord");
const Slack = require("../strategies/Slack");
const Traditional = require("../strategies/Traditional");
const Github = require("../strategies/Github");
const Facebook = require("../strategies/Facebook");
const Linkedin = require("../strategies/Linkedin");
const Twitter = require("../strategies/Twitter");
const Microsoft = require("../strategies/Microsoft");
const Twitch = require("../strategies/Twitch");
const Reddit = require("../strategies/Reddit");
const Spotify = require("../strategies/Spotify");
const Gitlab = require("../strategies/Gitlab");
const Bitbucket = require("../strategies/Bitbucket");
const Digitalocean = require("../strategies/Digitalocean");
const Coinbase = require("../strategies/Coinbase");

//export modules
module.exports = {

  // Export other strategy modules
    Google, Discord, Slack, 
    Traditional, Github, Facebook, 
    Linkedin, Twitter, Microsoft, 
    Twitch, Reddit, Spotify, 
    Gitlab, Bitbucket, Digitalocean, 
    Coinbase
    
};
