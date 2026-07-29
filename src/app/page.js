"use client";

import React from "react";
import { useCart } from "@/context/CartContext"; // <-- apne context ka sahi path use karo
import {
  ShoppingBag,
  Shirt,
  Home as HomeIcon, // rename to avoid conflict
  Dumbbell,
  Facebook,
  Twitter,
  Instagram,
  Star,
} from "lucide-react";

export default function Home() {
  const { addToCart } = useCart(); // <-- cart function

  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    async function fetchProducts() {
      const res = await fetch("/api/products", { cache: "no-store" });
      const data = await res.json();
      setProducts(data);
    }
    fetchProducts();
  }, []);

  return (
    <>

      
      <main className="container mx-auto p-6">

        {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white py-24">
        <div className="container mx-auto text-center px-6">
          <h1 className="text-6xl font-extrabold mb-6">
            ✨ Discover Everything You Need with NextShop 🛒
          </h1>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Explore the latest trends in fashion, electronics, and fitness. Affordable prices. Premium quality. Fast delivery.
          </p>
          <button className="bg-white text-blue-700 px-8 py-3 rounded-full font-semibold shadow hover:bg-gray-200 transition">
            Shop Now
          </button>
        </div>
      </section>


      {/* Categories */}
      <section className="container mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-10">Shop by Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <Shirt className="w-12 h-12 mx-auto mb-4 text-blue-600" />
            <h3 className="font-semibold">Fashion</h3>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <HomeIcon className="w-12 h-12 mx-auto mb-4 text-purple-600" />
            <h3 className="font-semibold">Home</h3>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <Dumbbell className="w-12 h-12 mx-auto mb-4 text-green-600" />
            <h3 className="font-semibold">Fitness</h3>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <ShoppingBag className="w-12 h-12 mx-auto mb-4 text-red-600" />
            <h3 className="font-semibold">Accessories</h3>
          </div>
        </div>
      </section>


        <h2 className="text-3xl font-bold mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((p) => (
            <div
              key={p._id}
              className="border rounded-lg p-4 bg-white shadow hover:shadow-lg transition"
            >
              <img src={p.image} alt={p.name} className="mb-4" />
              <h3 className="text-xl font-semibold">{p.name}</h3>
              <p className="text-gray-600 mb-2">${p.price}</p>
              <button
                onClick={() => addToCart(p)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {/* Testimonials */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-10">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {["Amazing quality!", "Fast delivery!", "Best prices!"].map(
              (feedback, i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
                >
                  <div className="flex justify-center mb-4">
                    {[...Array(5)].map((_, idx) => (
                      <Star
                        key={idx}
                        className="w-5 h-5 text-yellow-500 fill-yellow-500"
                      />
                    ))}
                  </div>
                  <p className="italic mb-4">"{feedback}"</p>
                  <h4 className="font-semibold">Customer {i + 1}</h4>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated!</h2>
          <p className="mb-6">Subscribe to get the latest deals and offers</p>
          <div className="flex justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-3 rounded-l-lg w-64 text-gray-900"
            />
            <button className="bg-purple-700 px-6 py-3 rounded-r-lg hover:bg-purple-800">
              Subscribe
            </button>
          </div>
        </div>
      </section>

       
      </main>


            
    </>
  );
}
