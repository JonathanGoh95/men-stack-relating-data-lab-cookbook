const mongoose = require("mongoose");

const { model, Schema } = mongoose;

const foodSchema = new Schema({
  name: { type: String, required: true },
});

const Food = model("Food", foodSchema);

module.exports = Food;
