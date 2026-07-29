"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditProduct() {
  const [form, setForm] = useState({ name: "", price: "", image: "" });
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    fetch(`/api/admin/products/${id}`)
      .then((res) => res.json())
      .then((data) => setForm(data));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/admin/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      alert("Product Updated");
      router.push("/admin/manage-products");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Edit Product</h2>

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

      <button className="bg-blue-600 text-white px-4 py-2 rounded">Update</button>
    </form>
  );
}
