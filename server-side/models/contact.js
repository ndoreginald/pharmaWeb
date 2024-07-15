const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// Define the Contact model
const contactSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: false,
    },
    message: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  });


 
 module.exports = mongoose.model("contact", contactSchema);