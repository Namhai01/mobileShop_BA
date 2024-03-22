const express = require("express");
const session = require("express-session");
const cors = require("cors");
const config = require("config");
const app = express();

const corsOptions = {
  origin: "*",
  // credentials: true,
};

app.use(cors(corsOptions));

// app.use(
//   session({
//     secret: config.app.session_key,
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false },
//   })
// );

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/static", express.static(config.get("app").STATIC_PATH));
app.use("/", require("../routers/web"));

module.exports = app;
