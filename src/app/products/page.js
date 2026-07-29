"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  // Fetch products from API (database)
  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    }
    fetchProducts();
  }, []);

  return (

    
    <div className="p-6">
      {/* Title */}
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
          Our <span className="text-blue-600">Products</span>
        </h1>

      <h1 className="text-3xl font-bold mb-4">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="border rounded-lg p-4 shadow">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover mb-2"
            />
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600">${product.price}</p>
            <p className="text-sm text-gray-500">{product.description}</p>
            <button
              onClick={() => addToCart(product)}
              className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* New Arrivals */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">🆕 New Arrivals</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {["Watch", "Camera", "Shoes", "Bag"].map((item, i) => (
              <div
                key={i}
                className="bg-white shadow-md rounded-xl p-4 hover:shadow-xl transition"
              >
                <img
                  src={`https://via.placeholder.com/200x150?text=${item}`}
                  alt={item}
                  className="rounded-md mb-3"
                />
                <h3 className="font-medium">{item}</h3>
                <span className="text-blue-600 font-bold">$99</span>
              </div>
            ))}
          </div>
        </section>

        {/* Best Sellers */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">🔥 Best Sellers</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {["Tablet", "Gaming Console"].map((item, i) => (
              <div
                key={i}
                className="flex items-center bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition"
              >
                <img
                  src={`https://via.placeholder.com/150x120?text=${item}`}
                  alt={item}
                  className="rounded-lg mr-6"
                />
                <div>
                  <h3 className="text-lg font-semibold">{item}</h3>
                  <p className="text-gray-600">Top-selling {item} loved by our customers.</p>
                  <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    Shop Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Categories */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">📂 Shop by Category</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {["Electronics", "Fashion", "Home", "Sports"].map((cat, i) => (
              <div
                key={i}
                className="bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-xl p-6 text-center shadow-lg hover:scale-105 transition"
              >
                <h3 className="text-xl font-bold">{cat}</h3>
                <p className="mt-2">Explore {cat} products</p>
              </div>
            ))}
          </div>
        </section>
        
    </div>
  );
}
