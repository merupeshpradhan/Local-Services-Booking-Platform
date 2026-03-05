import { useState } from "react";
import API from "../services/api";

export default function AddService({ onServiceAdded }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/services", form);
    setForm({ title: "", description: "", price: "", category: "" });
    onServiceAdded();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 mb-6">
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
        className="border p-2 w-full rounded"
        required
      />
      <input
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        className="border p-2 w-full rounded"
        required
      />
      <input
        name="price"
        type="number"
        value={form.price}
        onChange={handleChange}
        placeholder="Price"
        className="border p-2 w-full rounded"
        required
      />
      <input
        name="category"
        value={form.category}
        onChange={handleChange}
        placeholder="Category"
        className="border p-2 w-full rounded"
        required
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Service
      </button>
    </form>
  );
}