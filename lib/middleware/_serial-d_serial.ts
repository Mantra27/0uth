const passport = require("passport");

//serializig and deserializing module
module.exports = (()=>{

    passport.serializeUser(function(user:any, done:any) {
        done(null, user);
    });
    
    passport.deserializeUser(function(user:any, done:any) {
        done(null, user);
    });

})();