import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export default function DonationModal({ open, onClose }) {
  const { user } = useAuth();
  const { addToast } = useToast();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    quantity: "",
    address: "",
    category: "edible",
    image: "",
    notes: "",
  });

  // Reset form whenever modal opens
  useEffect(() => {
    if (open) {
      setForm({
        title: "",
        quantity: "",
        address: "",
        category: "edible",
        image: "",
        notes: "",
      });
    }
  }, [open]);

  if (!open) return null;

  const submitDonation = async (e) => {
    e.preventDefault();

    if (!user) {
      addToast("Please log in to donate.", "error");
      return;
    }

    if (!form.title || !form.quantity || !form.address) {
      addToast("Please fill all required fields.", "error");
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, "food_listings"), {
        userId: user.uid,
        type: "donation",
        title: form.title,
        quantity: Number(form.quantity),
        address: form.address,
        category: form.category,
        image: form.image || null,
        notes: form.notes,
        status: "available",
        createdAt: serverTimestamp(),
      });

      addToast("Donation posted successfully!", "success");
      onClose();

    } catch (err) {
      addToast("Error posting donation", "error");
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-xl animate-fadeIn">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Donate Food</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-gray-700 hover:text-gray-900" />
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={submitDonation} className="space-y-4">

          <input
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
            placeholder="Food Title"
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <input
            type="number"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
            placeholder="Quantity (kg/units)"
            required
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          />

          <input
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
            placeholder="Pickup Address"
            required
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />

          {/* CATEGORY */}
          <select
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            <option value="edible">Edible</option>
            <option value="non-edible">Non-Edible</option>
          </select>

          {/* IMAGE URL */}
          <input
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
            placeholder="Image URL (optional)"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
          />

          {/* NOTES */}
          <textarea
            rows="3"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
            placeholder="Additional notes (optional)"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
          ></textarea>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 disabled:opacity-50 font-semibold"
          >
            {loading ? "Posting..." : "Submit Donation"}
          </button>
        </form>

      </div>
    </div>
  );
}
