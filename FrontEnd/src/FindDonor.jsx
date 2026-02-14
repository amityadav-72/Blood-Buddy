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
{/* Gov't blood-bank quick link (eRaktkosh) */}
<div className="bg-white border-l-4 border-red-500 rounded-lg p-6 mb-8 shadow-sm hover:shadow-md transition">
  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

    {/* Left content */}
    <div className="flex items-start gap-4">
      <div className="bg-red-50 text-red-600 rounded-full p-3">
        <svg className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 2C6 6 4 8.5 4 11.5A6 6 0 0010 17a6 6 0 006-5.5C16 8.5 14 6 10 2z"/>
        </svg>
      </div>

      <div>
        <div className="flex items-center gap-3 flex-wrap">
          <h3 className="text-xl font-bold text-red-700">
            Search Government Blood Banks
          </h3>
          <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded">
            eRaktkosh • Official
          </span>
        </div>

        <p className="mt-2 text-gray-600">
          Check real-time blood availability from registered government blood
          banks across India using the official eRaktkosh portal.
        </p>
      </div>
    </div>

    {/* Right button */}
    <div>
      <a
        href="https://eraktkosh.mohfw.gov.in/eraktkoshPortal/#/publicPages/bloodAvailabilitySearch"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-5 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
      >
        Open eRaktkosh
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4M21 12H3"/>
        </svg>
      </a>
    </div>

  </div>
</div>

      </div>

      <Footer />
    </>
  );
};

export default FindDonor;