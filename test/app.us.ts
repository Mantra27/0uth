// myMiddleware.js
const myMiddleware = (options:any) => {
    return (req:any, res:any, next:any) => {
      // Your custom logic here, using the options if needed
      res.send("ss")
      next(); // Call next() to pass control to the next middleware or route handler
    };
  };
  
  module.exports = myMiddleware;