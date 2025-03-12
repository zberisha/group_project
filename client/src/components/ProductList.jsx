import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { getUserId, getToken } from "../services/AuthService";

// 1. Define your icon categories here
const categoryIcons = [
  { label: "All", icon: "🔎" },
  { label: "Meat", icon: "🥩" },
  { label: "Pizza", icon: "🍕" },
  { label: "Bakery", icon: "🍩" },
  { label: "Burger", icon: "🍔" },
  { label: "Sea Food", icon: "🦐" },
];

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);

  const businessId = getUserId();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = getToken();
        const response = await axios.get(
          `http://localhost:5000/api/products?businessId=${businessId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setProducts(response.data.products);
      } catch (err) {
        console.error("Error fetching products:", err.response?.data || err.message);
        setError("Failed to fetch products");
      }
    };

    fetchProducts();
  }, [businessId]);

  // 2. Filter logic based on category and search query
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      categoryFilter === "All" || product.category === categoryFilter;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.ingredients.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Products</h2>
      {error && <p className="text-red-500">{error}</p>}

      {/* 3. Category Icon Buttons */}
      <div className="flex flex-wrap items-center gap-4 mb-4">
        {categoryIcons.map((cat) => (
          <button
            key={cat.label}
            onClick={() => setCategoryFilter(cat.label)}
            className={`
              flex flex-col items-center px-4 py-2 rounded-md 
              transition-colors 
              ${categoryFilter === cat.label 
                ? "bg-accent text-accent-foreground" 
                : "bg-muted text-muted-foreground"}
            `}
          >
            <span className="text-2xl">{cat.icon}</span>
            <span className="text-sm">{cat.label}</span>
          </button>
        ))}
      </div>

      {/* 4. Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or ingredient"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full md:w-1/2"
        />
      </div>

      {/* 5. Display Filtered Products */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Card key={product._id}>
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
                <CardDescription>{product.description}</CardDescription>
              </CardHeader>
              <CardContent>
                  <p>Price: {product.price} ALL</p>
                  <p>
                    Category:{" "}
                    {(() => {
                      const categoryIcon = categoryIcons.find(
                        (cat) => cat.label === product.category
                      );
                      return categoryIcon
                        ? `${categoryIcon.icon} ${product.category}`
                        : product.category;
                    })()}
                  </p>
                  <p>Ingredients: {product.ingredients}</p>
                  <p>Calories: {product.calories}</p>
                  {product.imageUrl && (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-40 object-cover mt-2"
                    />
                  )}
                </CardContent>

            </Card>
          ))
        ) : (
          <p>No products found. Try changing the filters or search query.</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
