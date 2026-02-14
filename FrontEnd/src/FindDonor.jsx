import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import DonorFilterSection from "./DonorFilterSection";

const FindDonor = () => {
  const [navMode, setNavMode] = useState(false);

  return (
    <>
      {/* NAVBAR */}
      <Navbar navMode={navMode} />

      <main className="max-w-7xl mx-auto px-6 pt-28 pb-16">

        {/* 🩸 SEARCH + MAP SECTION */}
        <div className="mb-16">
          <DonorFilterSection
            navMode={navMode}
            setNavMode={setNavMode}
          />
        </div>

        {/* ℹ️ INFO SECTION */}
        <section className="relative bg-white/80 backdrop-blur-md border border-red-100 rounded-2xl p-8 mb-12 shadow-sm">

          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Find Blood Donors Near You
            </h1>

            <p className="text-gray-600 text-lg leading-relaxed">
              BloodBuddy helps you instantly connect with verified donors
              using real-time location matching. Filter by blood group and
              distance to get immediate help during emergencies.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            {[
              "Quick Matching",
              "Verified Donors",
              "Location-Based",
              "24/7 Available",
              "Secure & Private",
            ].map((tag, i) => (
              <span
                key={i}
                className="px-4 py-1.5 bg-red-50 text-red-600 text-sm font-medium rounded-full border border-red-100"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>

        {/* 🏥 ERAKTKOSH CARD */}
        <section className="group bg-gradient-to-r from-white to-red-50 border border-red-100 rounded-2xl p-8 shadow-sm hover:shadow-md transition">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            <div className="flex items-start gap-4">
              <div className="bg-red-100 text-red-600 rounded-xl p-3 shadow-sm">
                <svg className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 2C6 6 4 8.5 4 11.5A6 6 0 0010 17a6 6 0 006-5.5C16 8.5 14 6 10 2z"/>
                </svg>
              </div>

              <div>
                <div className="flex items-center flex-wrap gap-3">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Government Blood Bank Availability
                  </h3>

                  <span className="text-xs px-2 py-1 bg-red-100 text-red-600 rounded-md font-medium">
                    eRaktkosh • Official
                  </span>
                </div>

                <p className="mt-2 text-gray-600 max-w-xl">
                  Access real-time blood stock from registered government blood
                  banks across India through the official eRaktkosh system.
                </p>
              </div>
            </div>

            <div className="md:text-right">
              <a
                href="https://eraktkosh.mohfw.gov.in/eraktkoshPortal/#/publicPages/bloodAvailabilitySearch"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition shadow-sm group-hover:scale-[1.02]"
              >
                Open eRaktkosh
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4M21 12H3"
                  />
                </svg>
              </a>
            </div>

          </div>
        </section>

      </main>

      {/* FOOTER */}
      <Footer />
    </>
  );
};

export default FindDonor;
