// const redis = require("redis");
// const { REDIS_URL } = process.env;

// let redisClient;

// const getRedisClient = () => {
//     if (!redisClient) {
//         redisClient = redis.createClient({ url: REDIS_URL });

//         // Handle errors
//         redisClient.on("error", (error) => console.error(`Redis error: ${error}`));

//         // Handle reconnections
//         redisClient.on("reconnecting", () => console.log("Reconnecting to Redis..."));

//         // Connect to Redis
//         (async () => {
//             try {
//                 await redisClient.connect();
//                 console.log("Connected to Redis");
//             } catch (error) {
//                 console.error("Failed to connect to Redis:", error);
//                 process.exit(1); // Exit the process if Redis connection fails
//             }
//         })();
//     }
//     return redisClient;
// };

// module.exports = getRedisClient;
