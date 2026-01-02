import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/contacts";

export default function ContactForm({ refresh }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  const submit = async () => {
    if (!form.name || !form.email || !form.phone) {
      alert("All fields are required");
      return;
    }

    try {
      await axios.post(API_URL, form);
      setForm({ name: "", email: "", phone: "" });
      refresh();
    } catch (error) {
      console.error("Error adding contact:", error);
      alert("Failed to add contact");
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-medium text-gray-800 mb-5">
        Add New Contact
      </h2>

      <div className="space-y-4">
        <input
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
        />

        <input
          placeholder="Email Address"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
        />

        <input
          placeholder="Phone Number"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
        />

        <button
          onClick={submit}
          className="w-full rounded-md bg-gray-800 py-2 text-white font-medium hover:bg-gray-700 transition"
        >
          Add Contact
        </button>
      </div>
    </div>
  );
}
