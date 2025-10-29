import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: Number(process.env.PORT) || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  pokeApi: {
    baseUrl: process.env.POKEAPI_BASE_URL,
    pokemonEndpoint: `${process.env.POKEAPI_BASE_URL}/pokemon`,
    requestTimeout: Number(process.env.POKEAPI_REQUEST_TIMEOUT_MS) || 30000,
    limit: Number(process.env.POKEMON_LIMIT) || 1302,
  },
  cacheTtlMs: Number(process.env.CACHE_TTL_MS) || 3600000,
} as const;
