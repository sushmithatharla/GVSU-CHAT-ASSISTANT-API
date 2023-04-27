const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
  rating: Number,
  date: Date,
});

mongoose.model("feedback", feedbackSchema, "feedback");
