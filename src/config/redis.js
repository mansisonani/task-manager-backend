const redis = require("redis");

const redisClient = redis.createClient({
  socket: {
    host: process.env.REDIS_HOST || "redis",
    port: process.env.REDIS_PORT || 6379,
  },
});

redisClient
  .connect()
  .then(() => console.log("Redis Connected"))
  .catch((err) => console.error("Redis Error", err));

module.exports = redisClient;
