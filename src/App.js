const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const user = require('./routers/user');
const service = require('./routers/service');
const cors = require('cors');
const order = require('./routers/order');

require("./db/mongoose");
require("dotenv").config();

const corsOptions = {
	"origin": "*",
	"methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
	"preflightContinue": false,
	"optionsSuccessStatus": 204
  }

// Creating Express App
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(user);
app.use(service);
app.use(order)

const port = process.env.port || 5000;

app.get("/", (req, res) => {
	res.send("Hello world");
});

app.listen(port, () => {
	console.log("Server is up on the port " + port);
});