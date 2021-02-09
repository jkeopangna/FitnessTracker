//Require packages
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

//Server connection
const app = express();
const PORT = process.env.PORT || 3000;

//Static
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Routes
app.use(require('./routes/view.js'));
app.use(require('./routes/api.js'));

// Connect to Mongoose
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workoutdb", { useNewUrlParser: true });

// Listen for PORT
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
