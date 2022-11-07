import { createClient } from 'redis';

export const getRedisClient = async () => {
  const client = createClient({
    url: 'redis://default:redispw@localhost:49153',
  });

  client.on('error', (err) => console.log('Redis Client Error', err));

  await client.connect();

  return client;
};
