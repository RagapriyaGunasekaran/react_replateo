// src/components/Dashboard.jsx
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

  // If not logged in, show prompt
  if (!user) {
    return (
      <section className="page-section">
        <div className="page-container flex justify-center">
          <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md text-center">
            <h2 className="text-2xl font-bold mb-2 text-gray-900">Access Required</h2>
            <p className="text-gray-600 mb-6">Please log in to view your dashboard.</p>
            <button
              onClick={openAuthModal}
              className="bg-orange-600 text-white py-2 px-6 rounded-lg hover:bg-orange-700"
            >
              Login / Register
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Load user's listings
  useEffect(() => {
    const q = query(
      collection(db, "food_listings"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(q, (snap) => {
      const arr = [];
      let donations = 0,
        sales = 0,
        pending = 0;

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

  const markAsClaimed = async (id) => {
    try {
      await updateDoc(doc(db, "food_listings", id), {
        status: "claimed",
        claimedAt: serverTimestamp(),
      });
      addToast("Marked as claimed", "success");
    } catch (err) {
      addToast("Error updating listing", "error");
    }
  };

  const sendToAgriculture = async (id) => {
    try {
      await addDoc(collection(db, "agri_requests"), {
        listingId: id,
        status: "requested",
        createdAt: serverTimestamp(),
      });
      await updateDoc(doc(db, "food_listings", id), { status: "agri_requested" });
      addToast("Sent to agriculture partners", "success");
    } catch (err) {
      addToast("Error sending request", "error");
    }
  };

  return (
    <section className="page-section">
      <div className="page-container">

        {/* Greeting & Intro */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900">
            Welcome, {user.displayName || user.email.split("@")[0]}
          </h2>
          <p className="text-gray-600 mt-2">Manage your posted donations & sales.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow border-b-4 border-green-500 text-center">
            <p className="text-sm text-gray-600">Donations</p>
            <p className="text-3xl font-bold">{stats.donations}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow border-b-4 border-blue-500 text-center">
            <p className="text-sm text-gray-600">Sales</p>
            <p className="text-3xl font-bold">{stats.sales}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow border-b-4 border-orange-500 text-center">
            <p className="text-sm text-gray-600">Pending</p>
            <p className="text-3xl font-bold">{stats.pending}</p>
          </div>
        </div>

        {/* Listings */}
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Listings</h3>

        {listings.length === 0 ? (
          <p className="text-gray-600">You haven't posted any listings yet.</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {listings.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-lg p-5 flex gap-5">
                <div className="w-28 h-28 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={item.image || "https://images.unsplash.com/photo-1528731708534-816fe59f90ca"}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1">
                  <h4 className="font-bold text-lg">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.type} • {item.category}</p>
                  {item.notes && <p className="text-sm mt-2 text-gray-700">{item.notes}</p>}

                  <div className="mt-4 flex gap-3 flex-wrap">
                    {item.status === "available" ? (
                      <button
                        onClick={() => markAsClaimed(item.id)}
                        className="py-2 px-4 bg-orange-600 text-white rounded-lg hover:bg-orange-700 text-sm"
                      >
                        Mark Claimed
                      </button>
                    ) : (
                      <span className="py-2 px-4 bg-gray-100 rounded-lg text-sm">Status: {item.status}</span>
                    )}

                    {item.category === "non-edible" && (
                      <button
                        onClick={() => sendToAgriculture(item.id)}
                        className="py-2 px-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm"
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
