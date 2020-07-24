// defining requirements
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const expressLayouts = require("express-ejs-layouts");

// my routes requirements
const homeRoute = require("../server/route/homeRoute");
const adminRoute = require("../server/route/adminRoute");
const userRoute = require("../server/route/userRoute");

// create your express project
const app = express();

// loading css
app.use("/public", express.static(path.join(__dirname, "../public")));

// store session data
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);

// body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

// declaring my routes
app.use("/", homeRoute);
app.use("/admin", adminRoute);
app.use("/user", userRoute);

// defining your PORT
const hostname = "127.0.0.1";
const PORT = process.env.PORT || 8080;
app.listen(PORT, hostname, () => {
  console.log(`Server is running at http://${hostname}:${PORT}/`);
});
