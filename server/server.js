const express = require("express");
// const models = require("./models");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const schema = require("./schema/schema");
const { mongoDbPassword } = require("../config/config");

const app = express();
app.disable("x-powered-by");

// Replace with your mongoLab URI
const MONGO_URI = `mongodb+srv://loonz206:${mongoDbPassword}@cluster0.38qq9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
if (!MONGO_URI) {
  throw new Error("You must provide a MongoLab URI");
}

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
mongoose.connection
  .once("open", () => console.log("Connected to MongoDB."))
  .on("error", (error) => console.log("Error connecting to MongoLab:", error));

app.use(bodyParser.json());
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

const webpackMiddleware = require("webpack-dev-middleware");
const webpack = require("webpack");
const webpackConfig = require("../webpack.config.js");
app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;
