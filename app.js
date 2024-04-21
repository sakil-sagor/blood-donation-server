const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

// middlewares
app.use(express.json());
app.use(cors());

//routes
const donorRoute = require("./routes/v1/donor.route");

app.use("/api/v1/donor", donorRoute);

module.exports = app;
