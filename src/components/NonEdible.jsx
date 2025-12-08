import { Recycle, Sprout } from "lucide-react";

export default function NonEdible({ openDonationModal }) {
  return (
    <section className="page-section">

      <div className="page-container">

        {/* HEADER */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-extrabold text-gray-900">
            Non-Edible Waste Management
          </h2>
          <p className="text-lg text-gray-600 mt-3">
            Safely dispose or repurpose non-edible food waste via responsible channels.
          </p>
        </div>

        {/* ACTION CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* RECYCLING CARD */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-emerald-600 text-center hover:shadow-xl transition">
            <Recycle className="w-12 h-12 text-emerald-600 mx-auto mb-6" />

            <h3 className="card-heading mb-3">Recycling & Composting</h3>
            <p className="text-gray-600 mb-6">
              Convert non-edible waste into compost, fertilizer, or bio-energy.
            </p>

            <a
              href="/directory"
              className="bg-emerald-600 text-white py-3 px-8 rounded-lg hover:bg-emerald-700 transition"
            >
              Find Recycling Partners
            </a>
          </div>

          {/* AGRICULTURE CARD */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-emerald-600 text-center hover:shadow-xl transition">
            <Sprout className="w-12 h-12 text-emerald-600 mx-auto mb-6" />

            <h3 className="card-heading mb-3">Agriculture Use</h3>
            <p className="text-gray-600 mb-6">
              Non-edible food matter can support soil enrichment and farm use.
            </p>

            <button
              onClick={openDonationModal}
              className="bg-emerald-600 text-white py-3 px-8 rounded-lg hover:bg-emerald-700 transition"
            >
              Donate Waste to Farms
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
