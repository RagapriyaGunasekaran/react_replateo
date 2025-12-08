import { HandHeart, Tag, UploadCloud } from "lucide-react";

export default function GoodFood({ openDonationModal, openSaleModal }) {
  return (
    <section className="page-section">

      <div className="page-container">

        {/* HEADER */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-extrabold text-gray-900">
            Manage Surplus Edible Food
          </h2>
          <p className="text-lg text-gray-600 mt-3">
            Donate, sell, or list edible food items safely and responsibly.
          </p>
        </div>

        {/* ACTION CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* DONATION CARD */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-orange-500 text-center hover:shadow-xl transition">
            <HandHeart className="w-12 h-12 text-orange-600 mx-auto mb-6" />

            <h3 className="card-heading mb-3">Donate Food</h3>
            <p className="text-gray-600 mb-6">
              Give good-quality surplus food to verified NGOs.
            </p>

            <button
              onClick={openDonationModal}
              className="bg-orange-600 text-white py-3 px-8 rounded-lg hover:bg-orange-700 transition"
            >
              Start Donation
            </button>
          </div>

          {/* SALE CARD */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-orange-500 text-center hover:shadow-xl transition">
            <Tag className="w-12 h-12 text-orange-600 mx-auto mb-6" />

            <h3 className="card-heading mb-3">Discounted Sale</h3>
            <p className="text-gray-600 mb-6">
              Sell surplus edible food items at reduced prices.
            </p>

            <button
              onClick={openSaleModal}
              className="bg-orange-600 text-white py-3 px-8 rounded-lg hover:bg-orange-700 transition"
            >
              List for Sale
            </button>
          </div>

          {/* VIEW LISTINGS */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-orange-500 text-center hover:shadow-xl transition">
            <UploadCloud className="w-12 h-12 text-orange-600 mx-auto mb-6" />

            <h3 className="card-heading mb-3">View Listings</h3>
            <p className="text-gray-600 mb-6">
              Browse all available donations and sale listings.
            </p>

            <a
              href="/listings"
              className="bg-gray-300 text-gray-700 py-3 px-8 rounded-lg hover:bg-gray-400 transition"
            >
              View Listings
            </a>
          </div>

        </div>

      </div>

    </section>
  );
}
