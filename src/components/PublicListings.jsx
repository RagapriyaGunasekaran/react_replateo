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

  useEffect(() => {
    const q = query(collection(db, "food_listings"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      const arr = [];
      snap.forEach((doc) => arr.push({ id: doc.id, ...doc.data() }));
      setItems(arr);
    });
    return () => unsub();
  }, []);

  const filtered = items.filter((item) => {
    if (typeFilter !== "all" && item.type !== typeFilter) return false;
    if (categoryFilter !== "all" && item.category !== categoryFilter) return false;
    return true;
  });

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
      addToast("Sent to agriculture partners!", "success");
    } catch (err) {
      addToast("Error sending request", "error");
    }
  };

  return (
    <section className="page-section relative">

      {/* ORANGE GRADIENT BACKGROUND */}
      <div className="absolute inset-0 -z-10 bg-white" />

      <div className="page-container">

        {/* HEADER */}
        <div className="text-center mb-14">
          <h2 className="text-5xl font-extrabold text-orange-800 drop-shadow-sm">
            Public Listings
          </h2>
          <p className="text-lg text-orange-700 mt-3 max-w-2xl mx-auto">
            Browse all available community donations and discounted food listings.
          </p>
        </div>

        {/* FILTER BAR (Glass UI) */}
        <div
          className="
            flex flex-wrap gap-4 justify-center p-5 mb-12 rounded-3xl
            bg-gradient-to-br from-white/40 to-white/20 backdrop-blur-xl
            border border-white/30 shadow-lg shadow-orange-300/30
          "
        >
          <select
            className="p-3 rounded-xl bg-white/50 border border-white/40 shadow-sm"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="donation">Donations</option>
            <option value="sale">Sales</option>
          </select>

          <select
            className="p-3 rounded-xl bg-white/50 border border-white/40 shadow-sm"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="edible">Edible</option>
            <option value="non-edible">Non-Edible</option>
          </select>
        </div>

        {/* LISTING GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">

          {filtered.length === 0 && (
            <p className="text-orange-700 text-center w-full">No listings found.</p>
          )}

          {filtered.map((item) => {
            const borderColor =
              item.category === "non-edible" ? "border-emerald-500" : "border-orange-500";

            const fallbackImage =
              item.category === "non-edible"
                ? "https://images.unsplash.com/photo-1542838132-92c53300491e"
                : "https://images.unsplash.com/photo-1504674900247-0877df9cc836";

            return (
              <div
                key={item.id}
                className={`
                  rounded-3xl overflow-hidden border-t-4 ${borderColor}
                  bg-gradient-to-br from-white/40 to-white/20 backdrop-blur-xl
                  shadow-xl shadow-orange-300/30 border border-white/30
                  hover:shadow-orange-400/40 hover:scale-[1.02] transition-all
                `}
              >
                {/* IMAGE */}
                <img
                  src={item.image || fallbackImage}
                  alt=""
                  className="w-full h-44 object-cover"
                />

                {/* CONTENT */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-orange-800">{item.title}</h3>
                  <p className="text-orange-700 text-sm mt-1">
                    {item.type} • {item.category}
                  </p>

                  {item.notes && (
                    <p className="text-orange-700 mt-3 text-sm">{item.notes}</p>
                  )}

                  {/* ACTION BUTTONS */}
                  <div className="mt-5 flex gap-3 flex-wrap">

                    {item.status === "available" ? (
                      <button
                        onClick={() => claimItem(item.id)}
                        className="py-2 px-4 bg-orange-600 text-white rounded-xl hover:bg-orange-700
                                   shadow-md hover:shadow-lg text-sm transition"
                      >
                        Claim
                      </button>
                    ) : (
                      <span className="py-2 px-4 bg-white/50 text-orange-700 rounded-xl text-sm">
                        {item.status}
                      </span>
                    )}

                    {item.category === "non-edible" && (
                      <button
                        onClick={() => requestAgriculture(item.id)}
                        className="py-2 px-4 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700
                                   shadow-md hover:shadow-lg text-sm transition"
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
