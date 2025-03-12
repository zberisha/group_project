import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

// Category icons to display alongside product category
const categoryIcons = [
  { label: "Meat", icon: "🥩" },
  { label: "Pizza", icon: "🍕" },
  { label: "Bakery", icon: "🍩" },
  { label: "Burger", icon: "🍔" },
  { label: "Sea Food", icon: "🦐" },
];

const HomeComponent = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-8">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold">Welcome to Our Digital Menu</h1>
          <p className="mt-2 text-xl">Discover the best dishes from our partner businessses</p>
        </div>
      </header>

      <main className="container mx-auto p-4">
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => {
            // Find the matching icon for the product's category
            const categoryObj = categoryIcons.find((cat) => cat.label === product.category);
            const categoryDisplay = categoryObj
              ? `${categoryObj.icon} ${product.category}`
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
                  <p className="text-sm font-semibold">Price: ${product.price}</p>
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
