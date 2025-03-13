const express = require("express");
const router = express.Router();
const Business = require("../models/Business");
const Product = require("../models/Product");

router.get("/menu/:businessId", async (req, res) => {
  try {
    const { businessId } = req.params;

    const business = await Business.findById(businessId);
    if (!business) {
      return res.status(404).json({ error: "Business not found" });
    }

    const products = await Product.find({ businessId });

    res.json({
      business: {
        name: business.name,
      },
      products,
    });
  } catch (error) {
    console.error("Error fetching public menu:", error);
    res.status(500).json({ error: "Failed to fetch public menu" });
  }
});

module.exports = router;
