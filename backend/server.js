require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const usersRoutes = require("./routes/user");
const tasksRoutes = require("./routes/tasks");
const cors = require('cors')

const app = express();
// app.use(cors)
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
}); //cors error

app.use("/users", usersRoutes);
app.use("/tasks", tasksRoutes);

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

// console.log(process.env.USER,process.env.DATABASE)
const dbUrl ="mongodb+srv://"+process.env.USER+":"+process.env.PASSWORD+"@cluster0.f8yjf.mongodb.net/"+process.env.DATABASE+"?retryWrites=true&w=majority";
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(5002);
  })
  .catch((err) => {
    console.log(err);
  });
