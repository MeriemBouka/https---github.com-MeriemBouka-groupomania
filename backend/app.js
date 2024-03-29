const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const helmet = require("helmet");
require("dotenv").config();

const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const usersRoutes = require("./routes/users");

app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", " img-src 'self' data:");
  next();
});

app.use(
  helmet.contentSecurityPolicy({
    useDefaults: false,
  })
);

mongoose
  .connect
    (process.env.MONGO_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(express.json());

app.use("/api/publication", postRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/users", usersRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));


module.exports = app;
