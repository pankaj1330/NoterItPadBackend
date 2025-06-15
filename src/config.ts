require('dotenv').config()

export const config = {
  JWT_SECRET: process.env.JWT_SECRET_KEY,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  CA_CERTIFICATION: process.env.CA_CERTIFICATION,
  PORT: process.env.PORT,
  DB_HOST: process.env.DB_HOST,
  DB_URL: process.env.DB_URL,
};

