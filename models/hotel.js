const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HotelSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model("Hotel", HotelSchema);
