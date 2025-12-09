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

  // --------------------------------------------
  //  DEFAULT INDIAN FOOD LISTINGS (STATIC EXAMPLES)
  // --------------------------------------------
  const defaultListings = [
    {
      id: "d1",
      title: "Idly (Fresh & Soft)",
      type: "donation",
      category: "edible",
      notes: "Leftover from a wedding function. Fresh and hygienic.",
      image: "https://i.ibb.co/7xQcV5Wt/idli-371417-1280.jpg",
      status: "available",
      isDefault: true,
    },
    {
      id: "d2",
      title: "Dosa (Large Quantity)",
      type: "donation",
      category: "edible",
      notes: "Event catering surplus — suitable for NGOs.",
      image: "https://i.ibb.co/v6Sw3HxB/pexels-saveurssecretes-5560763.jpg",
      status: "available",
      isDefault: true,
    },
    {
      id: "d3",
      title: "Veg Biryani",
      type: "donation",
      category: "edible",
      notes: "Prepared for a temple feast. High quality ingredients.",
      image: "https://i.ibb.co/rGGxt9vp/istockphoto-179085494-612x612.jpg",
      status: "available",
      isDefault: true,
    },
    {
      id: "d4",
      title: "Steamed Rice (Bulk)",
      type: "donation",
      category: "edible",
      notes: "Excess from hostel mess. Freshly prepared.",
      image: "https://i.ibb.co/tT8vpM1Q/istockphoto-1062883480-612x612.jpg",
      status: "available",
      isDefault: true,
    },
  ];

  // --------------------------------------------
  // FETCH REAL USER LISTINGS FROM FIRESTORE
  // --------------------------------------------
  useEffect(() => {
    const q = query(collection(db, "food_listings"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      const arr = [];
      snap.forEach((doc) => arr.push({ id: doc.id, ...doc.data(), isDefault: false }));
      setItems(arr);
    });
    return () => unsub();
  }, []);

  // Combine default + Firestore listings
  const combinedListings = [...defaultListings, ...items];

  // Apply filters
  const filtered = combinedListings.filter((item) => {
    if (typeFilter !== "all" && item.type !== typeFilter) return false;
    if (categoryFilter !== "all" && item.category !== categoryFilter) return false;
    return true;
  });

  // --------------------------------------------
  // ACTION HANDLERS
  // --------------------------------------------
  const claimItem = async (id, isDefault) => {
    if (isDefault) {
      return addToast("Default demo items cannot be claimed.", "error");
    }

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

  const requestAgriculture = async (id, isDefault) => {
    if (isDefault) {
      return addToast("This example item cannot be used for agriculture.", "error");
    }

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

  // --------------------------------------------
  // RENDER UI
  // --------------------------------------------

  return (
    <section className="page-section relative">

      {/* WHITE BACKGROUND */}
      <div className="absolute inset-0 -z-10 bg-white" />

      <div className="page-container">

        {/* HEADER */}
        <div className="text-center mb-14">
          <h2 className="text-5xl font-extrabold text-orange-800 drop-shadow-sm">
            Public Listings
          </h2>
          <p className="text-lg text-orange-700 mt-3 max-w-2xl mx-auto">
            Browse available community donations and real-time food surplus listings.
          </p>
        </div>

        {/* FILTER BAR */}
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

          {filtered.map((item) => {
            const borderColor =
              item.category === "non-edible" ? "border-emerald-500" : "border-orange-500";

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
                  src={item.image}
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
                        onClick={() => claimItem(item.id, item.isDefault)}
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
                        onClick={() => requestAgriculture(item.id, item.isDefault)}
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
