declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_PORT: number;
      NODE_ENV?: "development" | "production";
      MONGO_URL: string
      JWT_ACCESS_SECRET: string
      JWT_REFRESH_SECRET: string
      JWT_EXPIRATION: string
      CLIENT_URL: string
    }
  }
}

export {};
