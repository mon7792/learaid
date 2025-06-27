import { createClient } from 'redis';

// Create and configure Redis client
export const redisClient = createClient({ url: process.env.REDIS_URL });
redisClient.on('error', (err) => console.log('Redis Client Error', err));

// Connect to Redis
await redisClient.connect();