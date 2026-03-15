import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const config = {
  port: process.env.PORT,
  mongoDbPassword: process.env.MONGODB_PASSWORD,
};

export const { port, mongoDbPassword } = config;
