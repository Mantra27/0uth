// app.js
const http = require('http');
const { oauthMiddleware } = require('0uth');

const oauthConfig = {
  client: 'google',
  client_id: 'your_google_client_id',
  client_secret: 'your_google_client_secret',
  redirect_uri: 'http://localhost:3000/api/auth/callback',
  scope: ['profile', 'email'],
  authPath: '/api/auth/google',
  callbackPath: '/api/auth/callback',
};

const handleRequest = (req, res) => {
  // Handle your other routes here or send a 404 response
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not Found');
};

const server = http.createServer((req, res) => {
  // Use the 0uth middleware to handle OAuth flow
  const oauthMiddlewareInstance = oauthMiddleware(oauthConfig);
  oauthMiddlewareInstance(req, res, () => {
    // Continue to the next middleware/route after OAuth handling
    handleRequest(req, res);
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
