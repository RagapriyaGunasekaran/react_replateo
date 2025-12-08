export default function Home() {
  return (
    <section className="page-section relative">

      {/* WHITE BACKGROUND */}
      <div className="absolute inset-0 -z-10 bg-white" />

      <div className="page-container grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* LEFT CONTENT */}
        <div>
          <span className="inline-block bg-white/60 backdrop-blur-lg px-4 py-1 rounded-full text-orange-700 font-medium shadow-sm border border-orange-200">
            GIVING FOOD A SECOND CHANCE
          </span>

          <h1 className="text-6xl font-extrabold text-orange-800 drop-shadow-sm mt-6">
            Zero Food Waste
            <br />
            <span className="text-orange-600">Share,Recycle,
              Sustain.</span>
          </h1>

          <p className="text-lg text-orange-700 mt-6 max-w-md">
            A smart platform connecting surplus food to those in need—efficiently, responsibly, and sustainably.
          </p>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <a
              href="/edible"
              className="px-8 py-3 text-lg bg-orange-600 text-white rounded-xl shadow-lg shadow-orange-400/40 hover:bg-orange-700 transition"
            >
              I Have Edible Food
            </a>

            <a
              href="/non-edible"
              className="px-8 py-3 text-lg bg-orange-100 border border-orange-200 rounded-xl hover:bg-orange-200 transition shadow-sm"
            >
              I Need Recycling
            </a>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex justify-center md:justify-end">
          <div
            className="
              w-full max-w-lg p-4 rounded-3xl 
              bg-gradient-to-br from-white to-orange-50/40
              shadow-lg shadow-orange-200/40 border border-orange-100
            "
          >
            <img
              src='https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1100&q=80'
              className="w-full h-full rounded-2xl object-cover"
              alt="Sustainable food"
            />
          </div>
        </div>

      </div>

    </section>
  );
}
