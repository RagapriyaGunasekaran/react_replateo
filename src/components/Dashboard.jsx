import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";

export default function Dashboard({ openAuthModal }) {
  const { user } = useAuth();
  const { addToast } = useToast();

  const [listings, setListings] = useState([]);
  const [stats, setStats] = useState({ donations: 0, sales: 0, pending: 0 });

  // If user is not logged in
  if (!user) {
    return (
      <section className="page-section relative">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200" />

        <div className="page-container flex justify-center">
          <div className="bg-white/40 backdrop-blur-xl border border-white/30 
                          p-10 rounded-3xl shadow-xl shadow-orange-300/30 text-center w-full max-w-md">
            <h2 className="text-3xl font-bold text-orange-800 mb-3">Access Required</h2>
            <p className="text-orange-700 mb-6">
              Please log in to view your dashboard.
            </p>
            <button
              onClick={openAuthModal}
              className="px-6 py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 shadow-md"
            >
              Login / Register
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Fetch listings owned by current user
  useEffect(() => {
    const q = query(
      collection(db, "food_listings"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(q, (snap) => {
      const arr = [];
      let donations = 0, sales = 0, pending = 0;

      snap.forEach((d) => {
        const data = { id: d.id, ...d.data() };
        arr.push(data);

        if (data.type === "donation") donations++;
        if (data.type === "sale") sales++;
        if (data.status === "available") pending++;
      });

      setListings(arr);
      setStats({ donations, sales, pending });
    });

    return () => unsub();
  }, [user]);

  const markClaimed = async (id) => {
    try {
      await updateDoc(doc(db, "food_listings", id), {
        status: "claimed",
        claimedAt: serverTimestamp(),
      });
      addToast("Marked as claimed!", "success");
    } catch (err) {
      addToast("Error updating item", "error");
    }
  };

  const sendToAgriculture = async (id) => {
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
      addToast("Error sending request", "error");
    }
  };

  return (
    <section className="page-section relative">

      {/* ORANGE GLASS GRADIENT BACKGROUND */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200" />

      <div className="page-container">

        {/* HEADER */}
        <div className="text-center mb-14">
          <h2 className="text-5xl font-extrabold text-orange-800 drop-shadow-sm">
            Welcome, {user.displayName || user.email.split("@")[0]}
          </h2>
          <p className="text-lg text-orange-700 mt-2">
            Manage your donations, sales, and food listings.
          </p>
        </div>

        {/* STAT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-14">
          {[
            { label: "Donations", value: stats.donations, color: "orange" },
            { label: "Sales", value: stats.sales, color: "blue" },
            { label: "Pending", value: stats.pending, color: "red" },
          ].map((item, i) => (
            <div
              key={i}
              className="
                bg-gradient-to-br from-white/40 to-white/20 
                backdrop-blur-xl border border-white/30 
                p-8 rounded-3xl shadow-xl
                shadow-orange-300/30 text-center hover:scale-[1.03]
                transition-all
              "
            >
              <p className="text-orange-700 text-sm">{item.label}</p>
              <p className="text-4xl font-extrabold text-orange-800 mt-2 drop-shadow">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {/* USER LISTINGS */}
        <h3 className="text-3xl font-bold text-orange-800 mb-6">Your Listings</h3>

        {listings.length === 0 ? (
          <p className="text-orange-700">You haven't posted anything yet.</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {listings.map((item) => (
              <div
                key={item.id}
                className="
                  bg-gradient-to-br from-white/40 to-white/20 
                  backdrop-blur-xl border border-white/30 
                  shadow-xl shadow-orange-300/30 
                  p-6 rounded-3xl flex gap-6
                  transition hover:scale-[1.02] hover:shadow-orange-400/40
                "
              >
                {/* IMAGE */}
                <img
                  src={item.image || "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6"}
                  className="w-32 h-32 rounded-2xl object-cover shadow-md"
                />

                {/* CONTENT */}
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-orange-800">{item.title}</h4>
                  <p className="text-orange-700 text-sm">
                    {item.type} • {item.category}
                  </p>

                  {item.notes && (
                    <p className="text-orange-700 mt-2 text-sm">{item.notes}</p>
                  )}

                  {/* ACTION BUTTONS */}
                  <div className="mt-4 flex gap-3 flex-wrap">

                    {item.status === "available" ? (
                      <button
                        onClick={() => markClaimed(item.id)}
                        className="px-4 py-2 bg-orange-600 text-white rounded-xl hover:bg-orange-700 
                                   shadow-md hover:shadow-lg text-sm"
                      >
                        Mark Claimed
                      </button>
                    ) : (
                      <span className="px-4 py-2 bg-white/60 text-orange-700 rounded-xl text-sm">
                        {item.status}
                      </span>
                    )}

                    {item.category === "non-edible" && (
                      <button
                        onClick={() => sendToAgriculture(item.id)}
                        className="px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 
                                   shadow-md hover:shadow-lg text-sm"
                      >
                        Send to Agriculture
                      </button>
                    )}

                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
