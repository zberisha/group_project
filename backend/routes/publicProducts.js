const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

router.get("/products", async (req, res) => {
  try {
    const products = await Product.find().populate("businessId", "name");
    res.json({ products });
  } catch (error) {
    console.error("Error fetching public products:", error);
    res.status(500).json({ error: "Failed to fetch public products" });
  }
});

module.exports = router;
