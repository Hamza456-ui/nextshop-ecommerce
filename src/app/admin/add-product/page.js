"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProduct() {
  const [form, setForm] = useState({ name: "", price: "", image: "" });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      alert("Product Added");
      router.push("/admin");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Add New Product</h2>

      <input
        type="text"
        placeholder="Product Name"
        className="border p-2 w-full mb-3"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />

      <input
        type="number"
        placeholder="Price"
        className="border p-2 w-full mb-3"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
        required
      />

      <input
        type="text"
        placeholder="Image URL"
        className="border p-2 w-full mb-3"
        value={form.image}
        onChange={(e) => setForm({ ...form, image: e.target.value })}
        required
      />

      <button className="bg-green-600 text-white px-4 py-2 rounded">Save</button>
    </form>
  );
}
