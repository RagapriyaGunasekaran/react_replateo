import { useToast } from "../context/ToastContext";

export default function Directory() {
  const { addToast } = useToast();

  return (
    <section className="page-section">
      <div className="page-container">

        {/* PAGE HEADER */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-extrabold text-gray-900">Partner Directory</h2>
          <p className="text-lg text-gray-600 mt-3">
            Find trusted NGOs, recyclers, farms, and organizations who accept food waste and surplus.
          </p>
        </div>

        {/* PARTNERS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* PARTNER CARD 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition flex gap-6">
            <img
              src="https://images.unsplash.com/photo-1526779259212-94c1d0b5a8d2"
              alt="NGO"
              className="w-28 h-28 rounded-lg object-cover flex-shrink-0"
            />
            <div className="flex-1">
              <h3 className="card-heading">Community Food Bank</h3>
              <p className="text-gray-600 mb-4">
                Accepts edible surplus food and distributes it to local shelters and orphanages.
              </p>
              <button
                onClick={() => addToast("Contact request sent!", "success")}
                className="bg-orange-600 text-white py-2 px-6 rounded-lg hover:bg-orange-700"
              >
                Contact
              </button>
            </div>
          </div>

          {/* PARTNER CARD 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition flex gap-6">
            <img
              src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2"
              alt="Recycling Partner"
              className="w-28 h-28 rounded-lg object-cover flex-shrink-0"
            />
            <div className="flex-1">
              <h3 className="card-heading">GreenCycle Composters</h3>
              <p className="text-gray-600 mb-4">
                Experts in converting non-edible food waste into compost and organic fertilizers.
              </p>
              <button
                onClick={() => addToast("Pickup request created!", "success")}
                className="bg-emerald-600 text-white py-2 px-6 rounded-lg hover:bg-emerald-700"
              >
                Request Pickup
              </button>
            </div>
          </div>

          {/* PARTNER CARD 3 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition flex gap-6">
            <img
              src="https://images.unsplash.com/photo-1523413651479-597eb2da0ad6"
              alt="Animal Shelter"
              className="w-28 h-28 rounded-lg object-cover flex-shrink-0"
            />
            <div className="flex-1">
              <h3 className="card-heading">Happy Paws Animal Shelter</h3>
              <p className="text-gray-600 mb-4">
                Uses suitable non-edible food waste for animal feed and support.
              </p>
              <button
                onClick={() => addToast("Message sent!", "success")}
                className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700"
              >
                Send Message
              </button>
            </div>
          </div>

          {/* PARTNER CARD 4 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition flex gap-6">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
              alt="Farm Partner"
              className="w-28 h-28 rounded-lg object-cover flex-shrink-0"
            />
            <div className="flex-1">
              <h3 className="card-heading">AgroFarm Collective</h3>
              <p className="text-gray-600 mb-4">
                Works with farmers to convert food waste into soil boosters and agricultural inputs.
              </p>
              <button
                onClick={() => addToast("Farm request submitted!", "success")}
                className="bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700"
              >
                Send Request
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
