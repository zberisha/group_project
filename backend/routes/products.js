const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const verifyToken = require("../middleware/auth");

router.post("/", verifyToken, async (req, res) => {
  const businessId = req.user.id;
  const { name, description, price, ingredients, calories, imageUrl } = req.body;
  
  if (!name || !price) {
    return res.status(400).json({ error: "Name and price are required" });
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
