import { useEffect, useState } from "react";
import axios from "axios";
import ContactForm from "./components/ContactForm.jsx";
import ContactList from "./components/ContactList.jsx";

const API_URL = "http://localhost:5000/api/contacts";

export default function App() {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    try {
      const res = await axios.get(API_URL);
      setContacts(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      setContacts([]);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Page container */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 text-center mb-10">
          Contact Management System
        </h1>

        {/* Main content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <ContactForm refresh={fetchContacts} />
          <ContactList contacts={contacts} refresh={fetchContacts} />
        </div>
      </div>
    </div>
  );
}
