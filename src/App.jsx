import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./components/Home";
import GoodFood from "./components/GoodFood";
import NonEdible from "./components/NonEdible";
import PublicListings from "./components/PublicListings";
import Dashboard from "./components/Dashboard";
import Directory from "./components/Directory";
import Contact from "./components/Contact";
import AuthPage from "./components/AuthPage";
import ForgotPassword from "./components/ForgotPassword";

import AuthModal from "./components/AuthModal";
import DonationModal from "./components/DonationModal";
import SaleModal from "./components/SaleModal";

export default function App() {
  const [authOpen, setAuthOpen] = useState(false);
  const [donationOpen, setDonationOpen] = useState(false);
  const [saleOpen, setSaleOpen] = useState(false);

  return (
    <div className="w-full min-h-screen overflow-x-hidden">

      {/* NAVBAR */}
      <Navbar openAuthModal={() => setAuthOpen(true)} />

      {/* MAIN ROUTES */}
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/edible"
          element={
            <GoodFood
              openDonationModal={() => setDonationOpen(true)}
              openSaleModal={() => setSaleOpen(true)}
            />
          }
        />

        <Route
          path="/non-edible"
          element={
            <NonEdible openDonationModal={() => setDonationOpen(true)} />
          }
        />

        <Route
          path="/listings"
          element={
            <PublicListings openAuthModal={() => setAuthOpen(true)} />
          }
        />

        <Route
          path="/dashboard"
          element={<Dashboard openAuthModal={() => setAuthOpen(true)} />}
        />

        <Route path="/directory" element={<Directory />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/auth" element={<AuthPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />


      </Routes>

      {/* MODALS */}
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
      <DonationModal
        open={donationOpen}
        onClose={() => setDonationOpen(false)}
      />
      <SaleModal open={saleOpen} onClose={() => setSaleOpen(false)} />
    </div>
  );
}
