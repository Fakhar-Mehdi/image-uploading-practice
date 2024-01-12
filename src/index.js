const exp = require("constants");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();

const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(path.join(publicDirectoryPath)));
app.use(express.json());
const port = 3000;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  age: {
    type: Number,
    min: 1,
    required: true,
  },
  dp: {
    type: String,
    unique: true,
    required: true,
  },
});
const User = mongoose.model("User", userSchema);

mongoose
  .connect("mongodb://127.0.0.1:27017/img-upload")
  .then(() => {
    console.log("Successfully connected to mongodb");
    app.listen(port, () => {
      console.log("Successfully listening to port: ", port);
    });
  })
  .catch((e) => console.log("Unable to connect to mongodb\nERROR: ", e));

app.post("/saveCredentials", async (req, res) => {
  try {
    //validate input
    const { name, email, age, dp } = req.body;
    if (!name || !email || !age || age <= 0 || !dp)
      throw new Error("Invalid Data");
    //create a new user
    const newUser = new User({ name, email, age, dp });
    const saved = await newUser.save();
    res.send(saved);
  } catch (e) {
    res.status(400).send(e.message.toString());
  }
});

// app.listen(port, () => {
//   console.log("Successfully listening to port: ", port);
// });
