
---

# Zerouth

Zerouth is a module for handling OAuth authentication in Node.js applications. It provides a middleware that simplifies the integration of various OAuth providers. With Zerouth, you can quickly set up OAuth authentication for popular platforms like Google, Discord, Reddit, Facebook, and more coming soon.

## Usage

Zerouth is designed to make OAuth authentication easier in your Node.js applications. Below is an example of how to use Zerouth to handle OAuth authentication with different platforms.

```javascript
const passport = require('passport');
const zerouth = require('./zerouth/lib/index');

// Define your OAuth configuration
const config = {
  client: 'google', // OAuth client name (e.g., 'google', 'discord', 'reddit')
  client_id: 'your_client_id',
  client_secret: 'your_client_secret',
  redirect_url: '/auth/google/callback', // Callback URL after authentication
  scope: ["profile", "email"],
  success_redirect: "/auth/success" //redirect after successful oauth
};

//use middlewares in this sequence only
app.use(require("express-session")({ secret: 'SECRET' , resave: true, saveUninitialized: true}))
app.use(passport.initialize())
app.use(passport.session())

// Apply the zerouth to your Express app
app.use(
  zerouth("/auth/google", config);
);

// Handle successful authentication
app.get('/auth/success', (req, res) => {
  return res.send(req.user)
});

// Start your Express server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

## Supported Platforms

Zerouth currently supports OAuth authentication for the following platforms:

- Google
- Discord
- Reddit
- Facebook
- GitHub
- LinkedIn
- Twitch
- Spotify
- ...and more

## Configuration

Zerouth uses a configuration object to set up OAuth parameters. Make sure to provide the necessary client information and callback URLs as required by the OAuth providers.

### Configuration Options

- `client`: The name of the OAuth client (e.g., 'google', 'discord').
- `client_id`: The client ID provided by the OAuth provider.
- `client_secret`: The client secret provided by the OAuth provider.
- `redirect_url`: The callback URL to redirect to after successful authentication.
- `success_redirect`: (Optional) The URL to redirect to after successful authentication.
- `failure_redirect`: (Optional) The URL to redirect to after failed authentication.
- `auth_type`: (Optional) The type of authentication (e.g., 'code', 'token').
- `scope`: (Optional) An array of scope strings for requesting specific permissions.
- ...other configuration options specific to each OAuth provider.

## Error Handling

Zerouth provides detailed error handling for various scenarios, including invalid configuration, unsupported clients, and duplicate paths or URLs. Make sure to handle errors appropriately based on your application's requirements.

## Contribution
Feel free to fork `dev` branch.

## License

This project is licensed under the [MIT License](LICENSE).

---