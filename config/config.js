// config.js
const dotenv = require("dotenv");
dotenv.config({ path: ".env.local" });
module.exports = {
  port: process.env.PORT,
  mongoDbPassword: process.env.MONGODB_PASSWORD,
};
