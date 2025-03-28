const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const verifyToken = require("../middleware/auth");

router.post("/", verifyToken, async (req, res) => {
  // Get the business id from the token
  const businessId = req.user.id;
  // Destructure all fields including category
  const { name, description, price, ingredients, calories, imageUrl, category } = req.body;
  
  // Basic validation for required fields
  if (!name || !price || !category) {
    return res.status(400).json({ error: "Name, price and category are required" });
  }

  try {
    const newProduct = new Product({
      businessId,
      name,
      description,
      price,
      ingredients,
      calories,
      imageUrl,
      category, // include category here
    });
    await newProduct.save();
    res.status(201).json({ message: "Product created", product: newProduct });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Failed to create product" });
  }
});

router.get("/", verifyToken, async (req, res) => {
  const requestedBusinessId = req.query.businessId;
  
  if (requestedBusinessId !== req.user.id) {
    return res.status(403).json({ error: "Unauthorized to view these products" });
  }

  try {
    const products = await Product.find({ businessId: requestedBusinessId });
    res.json({ products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

module.exports = router;
