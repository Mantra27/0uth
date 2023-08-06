const express = require("express")
const app = express();
const zeouth = require("../../lib/index.js");
const cors = require("cors");

const google = {
    client: 'google',
    client_id: '1014276340059-orscm84ijkimm5vp5qkemp1kmjl4cvpe.apps.googleusercontent.com',
    redirect_url: 'http://localhost:3000/google/auth/callback',
    client_secret: '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'
};

app.use(cors());
app.use(zeouth("/google", google))
app.get('/', (req, res)=>{
    res.send('auth server is running');
})
app.listen(3001, ()=>{
    console.log('auth server is running on port 3001');
})