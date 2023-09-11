declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_PORT: number;
      NODE_ENV?: "development" | "production";
      MONGO_URL: string
      JWT_SECRET: string
      JWT_EXPIRATION: string
    }
  }
}

export {};
