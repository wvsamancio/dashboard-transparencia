const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const router = require("./router");
const app = express();

app.use(cors({
    origin: "http://localhost:4200",
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(router);

module.exports = app;
