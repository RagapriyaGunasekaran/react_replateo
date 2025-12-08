import { HandHeart, Tag, UploadCloud } from "lucide-react";

export default function GoodFood({ openDonationModal, openSaleModal }) {
  return (
    <section className="page-section relative">

      {/* ORANGE GRADIENT BACKGROUND */}
      <div className="absolute inset-0 -z-10 bg-white" />

      <div className="page-container">

        {/* HEADER */}
        <div className="text-center mb-14">
          <h2 className="text-5xl font-extrabold text-orange-800 drop-shadow-sm">
            Manage Edible Surplus Food
          </h2>
          <p className="text-lg text-orange-700 mt-3 max-w-2xl mx-auto">
            Donate, sell, or share surplus edible food safely and responsibly using our community-driven platform.
          </p>
        </div>

        {/* ACTION CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* DONATE CARD */}
          <div
            className="
              relative p-10 rounded-3xl 
              bg-gradient-to-br from-white/40 to-white/20 
              backdrop-blur-xl border border-white/30 
              shadow-xl shadow-orange-300/30 
              hover:shadow-orange-400/40 hover:scale-[1.02]
              transition-all
            "
          >
            <div className="absolute -top-6 left-6 bg-orange-600 text-white p-4 rounded-2xl shadow-lg shadow-orange-500/40">
              <HandHeart className="w-10 h-10" />
            </div>

            <h3 className="text-2xl font-bold text-orange-800 mt-6">Donate Surplus Food</h3>
            <p className="text-orange-700 mt-3">
              Share high-quality edible food with NGOs and needy communities.
            </p>

            <button
              onClick={openDonationModal}
              className="mt-6 bg-orange-600 text-white py-3 px-8 rounded-xl hover:bg-orange-700
                         shadow-md hover:shadow-lg transition"
            >
              Start Donation
            </button>
          </div>

          {/* SALE CARD */}
          <div
            className="
              relative p-10 rounded-3xl 
              bg-gradient-to-br from-white/40 to-white/20 
              backdrop-blur-xl border border-white/30 
              shadow-xl shadow-orange-300/30 
              hover:shadow-orange-400/40 hover:scale-[1.02]
              transition-all
            "
          >
            <div className="absolute -top-6 left-6 bg-orange-600 text-white p-4 rounded-2xl shadow-lg shadow-orange-500/40">
              <Tag className="w-10 h-10" />
            </div>

            <h3 className="text-2xl font-bold text-orange-800 mt-6">Sell at Discounted Price</h3>
            <p className="text-orange-700 mt-3">
              Sell excess edible food at an affordable price point.
            </p>

            <button
              onClick={openSaleModal}
              className="mt-6 bg-orange-600 text-white py-3 px-8 rounded-xl hover:bg-orange-700
                         shadow-md hover:shadow-lg transition"
            >
              List for Sale
            </button>
          </div>

          {/* VIEW LISTINGS CARD */}
          <div
            className="
              relative p-10 rounded-3xl 
              bg-gradient-to-br from-white/40 to-white/20 
              backdrop-blur-xl border border-white/30 
              shadow-xl shadow-orange-300/30 
              hover:shadow-orange-400/40 hover:scale-[1.02]
              transition-all
            "
          >
            <div className="absolute -top-6 left-6 bg-orange-600 text-white p-4 rounded-2xl shadow-lg shadow-orange-500/40">
              <UploadCloud className="w-10 h-10" />
            </div>

            <h3 className="text-2xl font-bold text-orange-800 mt-6">Explore Public Listings</h3>
            <p className="text-orange-700 mt-3">
              View all available donations and discounted items posted by others.
            </p>

            <a
              href="/listings"
              className="mt-6 inline-block bg-white/40 backdrop-blur-xl border border-white/30 
                         text-orange-800 py-3 px-8 rounded-xl hover:bg-white/60 
                         shadow-md hover:shadow-lg transition"
            >
              View Listings
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
