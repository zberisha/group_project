import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

// Define category icons for filtering
const categoryIcons = [
  { label: "All", icon: "🔎" },
  { label: "Meat", icon: "🥩" },
  { label: "Pizza", icon: "🍕" },
  { label: "Bakery", icon: "🍩" },
  { label: "Burger", icon: "🍔" },
  { label: "Sea Food", icon: "🦐" },
];

const HomeComponent = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchPublicProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/public/products");
        setProducts(response.data.products);
      } catch (err) {
        console.error("Error fetching public products:", err.response?.data || err.message);
        setError("Failed to load products");
      }
    };

    fetchPublicProducts();
  }, []);

  // Filter products based on selected category and search query
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.ingredients.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-8">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold">Welcome to Our Digital Menu</h1>
          <p className="mt-2 text-xl">
            Discover delicious dishes from our partner restaurants
          </p>
        </div>
      </header>

      <main className="container mx-auto p-4">
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Category Filter and Search */}
        <div className="flex flex-col items-center gap-4 mb-6">
          {/* Category Filter Icons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {categoryIcons.map((cat) => (
              <button
                key={cat.label}
                onClick={() => setSelectedCategory(cat.label)}
                className={`flex flex-col items-center px-4 py-2 rounded-md transition-colors 
                  ${
                    selectedCategory === cat.label
                      ? "bg-accent text-accent-foreground"
                      : "bg-gray-200 text-gray-800"
                  }`}
              >
                <span className="text-2xl">{cat.icon}</span>
                <span className="text-sm">{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Search Input with Icon */}
          <div className="relative w-full max-w-md">
            {/* Search Icon */}
            <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 4a7 7 0 104 12.59l4.7 4.7a1 1 0 001.42-1.42l-4.7-4.7A7 7 0 0011 4z"
                />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search products by name or ingredient"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            // Find matching icon for the product's category
            const catObj = categoryIcons.find(
              (cat) => cat.label === product.category
            );
            const categoryDisplay = catObj
              ? `${catObj.icon} ${product.category}`
              : product.category;

            return (
              <Card key={product._id} className="hover:shadow-xl transition-shadow">
                <CardHeader>
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-40 object-cover rounded-t"
                    />
                  ) : (
                    <div className="w-full h-40 bg-gray-300 flex items-center justify-center">
                      <span className="text-gray-500">No Image</span>
                    </div>
                  )}
                  <CardTitle className="mt-2 text-lg font-bold">{product.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <CardDescription className="text-sm text-gray-600">
                    {product.description}
                  </CardDescription>
                  <p className="text-sm font-semibold">Price: {product.price}</p>
                  <p className="text-sm text-gray-600">Category: {categoryDisplay}</p>
                  <p className="text-sm text-gray-600">
                    Restaurant: {product.businessId?.name || "Unknown"}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default HomeComponent;
