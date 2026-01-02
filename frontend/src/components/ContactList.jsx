import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/contacts";

export default function ContactList({ contacts = [], refresh }) {
  const [openId, setOpenId] = useState(null);

  const del = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contact?")) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      refresh();
    } catch (error) {
      console.error("Error deleting contact:", error);
      alert("Failed to delete contact");
    }
  };

  const toggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-medium text-gray-800 mb-5">
        Contact List
      </h2>

      {contacts.length === 0 ? (
        <p className="text-gray-500 text-sm">No contacts available</p>
      ) : (
        <ul className="space-y-3">
          {contacts.map((c) => {
            const isOpen = openId === c._id;

            return (
              <li
                key={c._id}
                className="group rounded-lg border border-gray-200 bg-gray-50 p-4 transition hover:bg-gray-100"
                onClick={() => toggle(c._id)}
              >
                {/* Name */}
                <div className="flex items-center justify-between cursor-pointer">
                  <p className="font-medium text-gray-800">{c.name}</p>

                  <span className="text-sm text-gray-500 group-hover:text-gray-700">
                    {isOpen ? "▲" : "▼"}
                  </span>
                </div>

                {/* Details */}
                <div
                  className={`
                    mt-2 overflow-hidden text-sm text-gray-600
                    transition-all duration-300
                    ${isOpen ? "max-h-20 opacity-100" : "max-h-0 opacity-0"}
                    md:group-hover:max-h-20 md:group-hover:opacity-100
                  `}
                >
                  <p>{c.email}</p>
                  <p>{c.phone}</p>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      del(c._id);
                    }}
                    className="mt-2 inline-block rounded-md bg-gray-700 px-3 py-1.5 text-xs text-white hover:bg-gray-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
