import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  doc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

export default function PublicListings({ openAuthModal }) {
  const [items, setItems] = useState([]);
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const { user } = useAuth();
  const { addToast } = useToast();

  /** Load listings from Firestore */
  useEffect(() => {
    const q = query(collection(db, "food_listings"), orderBy("createdAt", "desc"));

    const unsub = onSnapshot(q, (snap) => {
      const arr = [];
      snap.forEach((doc) => arr.push({ id: doc.id, ...doc.data() }));
      setItems(arr);
    });

    return () => unsub();
  }, []);

  /** Apply filters */
  const filtered = items.filter((item) => {
    if (typeFilter !== "all" && item.type !== typeFilter) return false;
    if (categoryFilter !== "all" && item.category !== categoryFilter) return false;
    return true;
  });

  /** Claim editable items */
  const claimItem = async (id) => {
    if (!user) return openAuthModal();

    try {
      await updateDoc(doc(db, "food_listings", id), {
        status: "claimed",
        claimedBy: user.uid,
        claimedAt: serverTimestamp(),
      });

      addToast("Listing claimed!", "success");
    } catch (err) {
      addToast("Error claiming item", "error");
    }
  };

  /** Request agriculture pickup */
  const requestAgriculture = async (id) => {
    try {
      await addDoc(collection(db, "agri_requests"), {
        listingId: id,
        createdAt: serverTimestamp(),
        status: "requested",
      });

      await updateDoc(doc(db, "food_listings", id), {
        status: "agri_requested",
      });

      addToast("Sent to agriculture!", "success");
    } catch (err) {
      addToast("Error processing request", "error");
    }
  };

  return (
    <section className="page-section">
      <div className="page-container">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:justify-between items-start gap-6 mb-12">
          <div>
            <h2 className="text-4xl font-extrabold text-gray-900">Public Listings</h2>
            <p className="text-gray-600">Browse community donations and discounted food items.</p>
          </div>

          {/* FILTERS */}
          <div className="flex gap-4 flex-wrap">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="p-2 border rounded-lg"
            >
              <option value="all">All Types</option>
              <option value="donation">Donation</option>
              <option value="sale">Sale</option>
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="p-2 border rounded-lg"
            >
              <option value="all">All Categories</option>
              <option value="edible">Edible</option>
              <option value="non-edible">Non-Edible</option>
            </select>
          </div>
        </div>

        {/* LISTINGS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">

          {filtered.length === 0 && (
            <p className="text-gray-600">No listings available.</p>
          )}

          {filtered.map((item) => {
            const borderColor =
              item.category === "non-edible" ? "border-emerald-600" : "border-orange-500";

            const fallbackImg =
              item.category === "non-edible"
                ? "https://images.unsplash.com/photo-1542838132-92c53300491e"
                : "https://images.unsplash.com/photo-1504674900247-0877df9cc836";

            return (
              <div
                key={item.id}
                className={`bg-white rounded-xl shadow-lg overflow-hidden border-t-4 ${borderColor}`}
              >
                {/* IMAGE */}
                <img
                  src={item.image || fallbackImg}
                  className="w-full h-44 object-cover"
                  alt=""
                />

                {/* CONTENT */}
                <div className="p-5">
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <p className="text-gray-600 text-sm">
                    {item.type} • {item.category}
                  </p>

                  {item.notes && (
                    <p className="mt-2 text-gray-700 text-sm">{item.notes}</p>
                  )}

                  {/* ACTIONS */}
                  <div className="mt-4 flex gap-2 flex-wrap">

                    {/* CLAIM BUTTON */}
                    {item.status === "available" ? (
                      <button
                        onClick={() => claimItem(item.id)}
                        className="py-2 px-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm"
                      >
                        Claim
                      </button>
                    ) : (
                      <span className="py-2 px-4 bg-gray-200 rounded-lg text-sm">
                        Status: {item.status}
                      </span>
                    )}

                    {/* AGRICULTURE BUTTON */}
                    {item.category === "non-edible" && (
                      <button
                        onClick={() => requestAgriculture(item.id)}
                        className="py-2 px-4 bg-amber-600 text-white rounded-lg hover:bg-amber-700 text-sm"
                      >
                        Agriculture
                      </button>
                    )}

                  </div>
                </div>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}
