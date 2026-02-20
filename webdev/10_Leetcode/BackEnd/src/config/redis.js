import { createClient } from 'redis';

export const redisClient = createClient({
    username: 'default',
    password: 'xQ0GUABGt5EZRQaDI68fgtmiBJwosANY',

 

    socket: {
        host: 'redis-18841.crce276.ap-south-1-3.ec2.cloud.redislabs.com',
        port: 18841
    }
});