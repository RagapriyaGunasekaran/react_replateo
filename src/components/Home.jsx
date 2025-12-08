export default function Home() {
  return (
    <section className="page-section">

      <div className="page-container grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* LEFT CONTENT */}
        <div>
          <span className="inline-block bg-orange-100 text-orange-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
            Fighting Food Waste Together
          </span>

          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
            Zero Food Waste:
            <span className="block text-orange-600">Share, Recycle, Sustain.</span>
          </h1>

          <p className="text-lg text-gray-600 mb-8 max-w-md">
            Connect surplus edible food with those in need — donate, recycle, or list at a discount.
          </p>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/edible"
              className="px-8 py-3 text-lg bg-orange-600 text-white rounded-xl shadow hover:bg-orange-700"
            >
              I Have Food to Share
            </a>

            <a
              href="/non-edible"
              className="px-8 py-3 text-lg bg-white border rounded-xl hover:bg-gray-100"
            >
              I Need to Recycle
            </a>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex justify-center md:justify-end">
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1100&q=70"
            className="w-full max-w-lg rounded-xl shadow-xl object-cover"
            alt="Sustainable Food"
          />
        </div>

      </div>

    </section>
  );
}
