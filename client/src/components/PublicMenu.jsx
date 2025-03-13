import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PublicMenu = () => {
  const { businessId } = useParams();
  const [business, setBusiness] = useState(null);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/public/menu/${businessId}`
        );
        setBusiness(response.data.business);
        setProducts(response.data.products);
      } catch (err) {
        console.error("Error fetching public menu:", err);
        setError("Failed to load menu");
      }
    };

    fetchMenu();
  }, [businessId]);

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  if (!business) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <header className="text-center my-4">
        <h1 className="text-3xl font-bold">{business.name}</h1>
        <p className="text-gray-600">Public Menu</p>
      </header>

      <main className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white rounded shadow p-4">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-40 object-cover rounded"
              />
            ) : (
              <div className="w-full h-40 bg-gray-300 flex items-center justify-center rounded">
                <span className="text-gray-500">No Image</span>
              </div>
            )}
            <h2 className="mt-2 font-bold text-lg">{product.name}</h2>
            <p className="text-gray-600 text-sm">{product.description}</p>
            <p className="font-semibold">Price: ${product.price}</p>
            {product.category && (
              <p className="text-sm text-gray-500">Category: {product.category}</p>
            )}
          </div>
        ))}
      </main>
    </div>
  );
};

export default PublicMenu;
