var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();
const cors = require("cors");

var indexRouter = require("./routes/index");
var serviceRouter = require("./routes/services");
var selfWashRouter = require("./routes/selfWash");
var moduleRouter = require("./routes/modules");
var boardRouter = require("./routes/board");
var equipmentRouter = require("./routes/equipment");
var authRouter = require("./routes/auth");
var constructorRouter = require("./routes/constructor");
var spareRouter = require("./routes/spare");
var questionRouter = require("./routes/question");
var aboutRouter = require("./routes/about");
var galleryRouter = require("./routes/gallery");
var partnersRouter = require("./routes/partners");

var app = express();
app.use(cors());
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/service", serviceRouter);
app.use("/self", selfWashRouter);
app.use("/module", moduleRouter);
app.use("/board", boardRouter);
app.use("/equip", equipmentRouter);
app.use("/auth", authRouter);
app.use("/spare", spareRouter);
app.use("/constuctor", constructorRouter);
app.use("/question", questionRouter);
app.use("/about", aboutRouter);
app.use("/gallery", galleryRouter);
app.use("/partners", partnersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
