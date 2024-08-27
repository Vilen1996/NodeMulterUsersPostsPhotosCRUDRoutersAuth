const express = require("express");
const dotenv = require("dotenv").config();
const usersRouter = require("./api/users");
const mongoose = require("mongoose");
const postsRouter = require("./api/posts");
const photosRouter = require("./api/photo");

const app = express();
app.use(express.json());
const PORT = dotenv.parsed.PORT;

mongoose.connect("mongodb://localhost:27017/social");

app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/photos", photosRouter);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} port`);
});
