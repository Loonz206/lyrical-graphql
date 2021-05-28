// config.js
const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  port: process.env.PORT,
  mongoDbPassword: process.env.MONGODB_PASSWORD,
};
