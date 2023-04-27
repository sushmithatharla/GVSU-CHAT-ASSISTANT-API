const express = require("express");
const cors = require("cors");
var path = require("path");

const bodyParser = require("body-parser");
const app = express();

const config = require("./config/keys");

//  mongoose is a Node. js-based Object Data Modeling (ODM) library for MongoDB
const mongoose = require("mongoose");
require("./models/ContactInfo");
require("./models/Feedback");

// databse connection
mongoose
  .connect(config.mongoDbURI, { useNewUrlParser: true })
  .then(() => console.log("connected"))
  .catch((e) => console.log(e));

const corsOptions = {
  origin: function (origin, callback) {
    callback(null, true);
  },
  credentials: true,
};
app.use(cors(corsOptions));

app.use(bodyParser.json());

// helps in routing to a new service to the dialogflow or database.
require("./routes/routes")(app);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("front-end/build"));

  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "/font-end/build/index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT);
