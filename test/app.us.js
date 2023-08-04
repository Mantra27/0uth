"use strict";
// myMiddleware.js
const myMiddleware = (options) => {
    return (req, res, next) => {
        // Your custom logic here, using the options if needed
        console.log('This is a custom middleware.', req.url, options);
        res.send("ss");
        next(); // Call next() to pass control to the next middleware or route handler
    };
};
module.exports = myMiddleware;
