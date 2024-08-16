const express = require("express");

const app = express();

const path = require("path");

const {connectMongoDB} = require("./config");

const router = require("./routes/url")

const staticRouter = require("./routes/staticRouter")

const userRouter = require("./routes/user")


const cookieParser = require("cookie-parser");
const { checkForAuthentication, restrictTo } = require("./middlewares/auth");

const PORT = 8000

connectMongoDB("mongodb://127.0.0.1:27017/shortme").then(() => {
      console.log("MongoDB connected...");
})

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"))

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(cookieParser());

app.use(checkForAuthentication);

app.use("/url", restrictTo("NORMAL"), router);

app.use("/", staticRouter);

app.use("/user", userRouter);

app.listen(PORT, () => {
      console.log("Server is listening on port: " + PORT)
})