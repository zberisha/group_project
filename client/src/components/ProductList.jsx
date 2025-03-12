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

const ProductList = () => {
  const [products, setProducts] = useState([]);
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

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Your Products</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.length > 0 ? (
          products.map((product) => (
            <Card key={product._id}>
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
                <CardDescription>{product.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Price: {product.price}ALL</p>
                <p>Ingredients: {product.ingredients}</p>
                <p>Calories: {product.calories} </p>
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
          <p>No products found. Add some products to your menu!</p>
        )}
      </div>
    </div>
  );
};
 
export default ProductList;
