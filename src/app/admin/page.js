"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const emptyForm = { name: "", price: "", image: "", description: "", category: "" };

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  // protect page
  useEffect(() => {
    if (status === "loading") return;
    if (!session || session.user.role !== "admin") router.replace("/");
  }, [session, status, router]);

  // load products
  async function load() {
    const res = await fetch("/api/products", { cache: "no-store" });
    setProducts(await res.json());
  }
  useEffect(() => { load(); }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name: form.name,
      price: Number(form.price),
      image: form.image,
      description: form.description,
      category: form.category,
    };

    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `/api/products/${editingId}` : "/api/products";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);

    if (!res.ok) {
      alert("Failed (are you logged in as admin?)");
      return;
    }

    setForm(emptyForm);
    setEditingId(null);
    load();
  }

  function startEdit(p) {
    setForm({
      name: p.name || "",
      price: p.price || "",
      image: p.image || "",
      description: p.description || "",
      category: p.category || "",
    });
    setEditingId(p._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function remove(id) {
    if (!confirm("Delete this product?")) return;
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    if (res.ok) load();
  }

  if (status === "loading") return <p className="p-6">Loading...</p>;
  if (!session || session.user.role !== "admin") return null;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded shadow mb-8">
        <input
          className="border p-2 rounded"
          placeholder="Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          className="border p-2 rounded"
          type="number"
          step="0.01"
          placeholder="Price"
          value={form.price}
          onChange={e => setForm({ ...form, price: e.target.value })}
          required
        />
        <input
          className="border p-2 rounded md:col-span-2"
          placeholder="Image URL"
          value={form.image}
          onChange={e => setForm({ ...form, image: e.target.value })}
          required
        />
        <input
          className="border p-2 rounded"
          placeholder="Category (optional)"
          value={form.category}
          onChange={e => setForm({ ...form, category: e.target.value })}
        />
        <input
          className="border p-2 rounded"
          placeholder="Description (optional)"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
        />
        <div className="md:col-span-2 flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {editingId ? (loading ? "Updating..." : "Update Product") : (loading ? "Saving..." : "Add Product")}
          </button>
          {editingId && (
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded"
              onClick={() => { setEditingId(null); setForm(emptyForm); }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* List */}
      <h2 className="text-2xl font-semibold mb-4">Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map(p => (
          <div key={p._id} className="border rounded p-4 bg-white shadow">
            {p.image && <img src={p.image} alt={p.name} className="mb-3" />}
            <h3 className="text-lg font-semibold">{p.name}</h3>
            <p className="text-gray-600">${p.price}</p>
            <div className="mt-3 flex gap-2">
              <button className="bg-yellow-500 text-white px-3 py-1 rounded" onClick={() => startEdit(p)}>
                Edit
              </button>
              <button className="bg-red-600 text-white px-3 py-1 rounded" onClick={() => remove(p._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
