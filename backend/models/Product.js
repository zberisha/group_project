const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
    },
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    ingredients: { type: String },
    calories: { type: Number },
    imageUrl: { type: String },
    category: {
      type: String,
      required: true,
      enum: ["Meat", "Pizza", "Bakery", "Burger", "Sea Food"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
