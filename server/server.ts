import express from "express";
import { graphqlHTTP } from "express-graphql";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpack from "webpack";
import schema from "./schema/schema";
import { mongoDbPassword } from "../config/config";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const webpackConfig = require("../webpack.config.js") as webpack.Configuration;

const app = express();
app.disable("x-powered-by");

// Replace with your mongoLab URI
const MONGO_URI = `mongodb+srv://loonz206:${mongoDbPassword}@cluster0.38qq9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
if (!MONGO_URI) {
  throw new Error("You must provide a MongoLab URI");
}

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI);
mongoose.connection
  .once("open", () => console.log("Connected to MongoDB."))
  .on("error", (error) => console.log("Error connecting to MongoLab:", error));

app.use(bodyParser.json());
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  }),
);

app.use(webpackDevMiddleware(webpack(webpackConfig)));

export default app;
