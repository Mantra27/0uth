const fastify = require('fastify')({ logger: true });
const zerouth = require('0uth');

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
