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
          
            <img
              src='https://t4.ftcdn.net/jpg/15/75/53/27/240_F_1575532744_7Vot5BI8yPPgJnBEKkhfRpRY0a7PXaQZ.jpg'
              className="w-full h-full rounded-2xl object-cover"
              alt="Sustainable food"
            />
        
        </div>

      </div>

    </section>
  );
}
