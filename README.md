# * Unreleased *
## 0uth (zerouth) - One Function OAuth and Passport.js Integration

![GitHub](https://img.shields.io/github/license/Mantra27/0uth)
![npm](https://img.shields.io/npm/v/0uth)
![Node.js](https://img.shields.io/node/v/0uth)
![GitHub last commit](https://img.shields.io/github/last-commit/Mantra27/0uth)

**0uth** is a powerful and user-friendly npm package that simplifies the process of integrating OAuth and Passport.js authentication in your Node.js applications. It provides out-of-the-box functionality to handle the complexities of OAuth while abstracting away the boilerplate code, allowing you to focus on building your application's core features.

## Key Features

- Supports multiple OAuth providers, including Traditional, google, facebook, github, linkedin, twitter, microsoft, discord, slack, twitch, reddit, spotify, gitlab, bitbucket, digitalocean, coinbase.
- Integrates seamlessly with Passport.js for user authentication and session management.
- Provides a clean and easy-to-use API for initiating the OAuth flow and handling callback URLs.
- Allows customizable options for OAuth providers and scopes.
- Compatible with both Express.js and Fastify frameworks, and obviously http.

## Installation
### *Unreleased*
Install `0uth` via npm/yarn:



```bash
npm install 0uth --save
```

```bash
yarn add 0uth
```

## Usage with Express.js

```javascript
const express = require("express");
const cors = require("cors");
const zerouth = require("0uth"); // unreleased

const _port = process.env ?? 8080;

const app = express();
app.use(cors());

// Entry Point [POST]: http://localhost:8080/auth/google
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
```

<details>
  <summary>Usage with Fastify</summary>

  ```javascript
  const fastify = require('fastify')({ logger: true });
  const zerouth = require('0uth'); //unreleased

  const oauthConfig = {
    client: 'google',
    client_id: 'your_google_client_id',
    client_secret: 'your_google_client_secret',
    redirect_uri: 'http://localhost:3000/api/auth/callback',
    scope: ['profile', 'email'],
    authPath: '/api/auth/google',
    callbackPath: '/api/auth/callback',
  };

  // Register the fastify-0uth plugin
  fastify.register(zerouth({
      oauthConfig,
  }));

  // Your other application routes
  fastify.get('/', (request, reply) => {
    reply.send('Hello, this is your Fastify server!');
  });

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
  <summary>Usage with http</summary>

  ```javascript
  const http = require('http');
  const { oauthMiddleware } = require('0uth'); //unreleased

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

Contributions are welcome!
