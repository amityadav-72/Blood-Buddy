import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import DonorFilterSection from "./DonorFilterSection";

const FindDonor = () => {
  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto p-6 pt-24">

        {/* ===== Donor Search Section ===== */}
        <div className="mb-12">
          <DonorFilterSection />
        </div>

        {/* ===== Information Section ===== */}
        <div className="bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-500 rounded-lg p-6 mb-8 shadow-sm">
          <h1 className="text-3xl font-bold text-red-700 mb-4 text-center">
            Find Blood Donors in Your Area
          </h1>

          <p className="text-gray-700 text-lg leading-relaxed text-justify">
            Blood Buddy helps you quickly find verified blood donors near your
            location. Our intelligent matching system connects recipients with
            compatible donors using location-based search technology.
            Simply filter by blood group and location to find nearby donors
            instantly.
          </p>

          <div className="mt-6 flex flex-wrap gap-2 justify-center">
            <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
              Quick Matching
            </span>
            <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
              Verified Donors
            </span>
            <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
              Location-Based
            </span>
            <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
              24/7 Available
            </span>
            <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
              Secure & Private
            </span>
          </div>
        </div>

      </div>

      <Footer />
    </>
  );
};

export default FindDonor;
