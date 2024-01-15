import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(path.join(publicDirectoryPath)));
app.use(express.json());
const port = 3000;

mongoose
  .connect("mongodb://127.0.0.1:27017/img-upload")
  .then(() => {
    console.log("Successfully connected to mongodb");
    app.listen(port, () => {
      console.log("Successfully listening to port: ", port);
    });
  })
  .catch((e) => console.log("Unable to connect to mongodb\nERROR: ", e));
