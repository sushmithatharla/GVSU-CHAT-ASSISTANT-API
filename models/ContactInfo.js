const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactInfoSchema = new Schema({
  fullName: String,
  email: String,
  phone: String,
  question: String,
  date: Date | String,
});

mongoose.model("contactInfo", contactInfoSchema, "contactinfos");
