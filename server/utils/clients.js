const Redis = require("ioredis");

// Connect to the Redis database using the provided URL
const client = new Redis(process.env.REDIS_URL);

// Test the connection
client.on("connect", () => {
  console.log("Connected to Redis");
});

client.on("error", (err) => {
  console.error("Error connecting to Redis:", err);
});

module.exports = client;
