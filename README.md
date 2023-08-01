# 0uth - Easy OAuth and Passport.js Integration

![GitHub](https://img.shields.io/github/license/Mantra27/0uth)
![npm](https://img.shields.io/npm/v/0uth)
![Node.js](https://img.shields.io/node/v/0uth)
![GitHub last commit](https://img.shields.io/github/last-commit/Mantra27/0uth)

**0uth** is a powerful and user-friendly npm package that simplifies the process of integrating OAuth and Passport.js authentication in your Node.js applications. It provides out-of-the-box functionality to handle the complexities of OAuth while abstracting away the boilerplate code, allowing you to focus on building your application's core features.

## Key Features

- Supports multiple OAuth providers, including Google, Facebook, GitHub, LinkedIn, Twitter, and more.
- Integrates seamlessly with Passport.js for user authentication and session management.
- Provides a clean and easy-to-use API for initiating the OAuth flow and handling callback URLs.
- Allows customizable options for OAuth providers and scopes.
- Compatible with both Express.js and Fastify frameworks.

## Installation

Install `0uth` via npm/yarn:

```bash
npm install 0uth --save
```

```bash
yarn add 0uth
```

## Usage with Express.js

```javascript
const express = require('express');
const passport = require('passport');
const 0uth = require('0uth');

const app = express();

// Initialize Passport
app.use(passport.initialize());

// Your OAuth configuration (replace with your actual client IDs, secrets, and redirect URIs)
const oauthConfig = {
  client: 'google',
  client_id: 'your_google_client_id',
  client_secret: 'your_google_client_secret',
  redirect_uri: 'http://localhost:3000/api/auth/callback',
  scope: ['profile', 'email'],
};

// Use 0uth as middleware
app.use(0uth(oauthConfig));

// Define your application routes here

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
```

<details>
  <summary>## Usage with Fastify</summary>

  ```javascript
  const fastify = require('fastify')({ logger: true });
  const passport = require('passport');
  const 0uth = require('0uth');
  const fastify0uth = require('fastify-0uth');

  const oauthConfig = {
    // Your OAuth configuration options here
  };

  // Register fastify-0uth plugin
  fastify.register(fastify0uth, { oauthConfig });

  // Your application routes here

  const start = async () => {
    try {
      await fastify.listen(3000);
      console.log('Server listening on port 3000');
    } catch (err) {
      fastify.log.error(err);
      process.exit(1);
    }
  };
  start();
  ```
</details>

<details>
  <summary>## Usage with http</summary>

  ```javascript
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

  ```
</details>



## Documentation

For detailed documentation, examples, and configuration options, please visit the [Wiki](https://github.com/Mantra27/0uth/wiki) of this repository.

## License

This project is licensed under the [MIT License](https://github.com/Mantra27/0uth/blob/master/LICENSE).

## Contributing

Contributions are welcome! Please read our [Contributing Guidelines](https://github.com/Mantra27/0uth/blob/master/CONTRIBUTING.md) for more information.
