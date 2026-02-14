import React from "react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-red-50 via-white to-pink-50 text-gray-900">

      {/* 🌈 SOFT GLOW */}
      <div className="absolute w-[700px] h-[700px] bg-red-200/40 rounded-full blur-[160px]" />

      {/* 🔷 MAIN CONTENT */}
      <div className="relative z-10 max-w-6xl px-6 text-center">

        {/* BADGE */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block mb-6 px-4 py-1 bg-white/70 backdrop-blur-md rounded-full text-sm shadow"
        >
          🩸 Amravati’s Smart Blood Donor Network
        </motion.div>

        {/* HEADING */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight"
        >
          Find Blood Donors <br />
          <span className="text-red-600">in Seconds</span>
        </motion.h1>

        {/* SUBTEXT */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto"
        >
          Real-time location matching. Instant contact. Life-saving speed.
          Built for emergencies.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="/find-donor"
            className="bg-red-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-red-700 transition shadow-lg"
          >
            🔍 Find Donor
          </a>

          <a
            href="/become-donor"
            className="bg-white border border-red-200 text-red-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-red-50 transition"
          >
            ❤️ Become Donor
          </a>
        </motion.div>

        {/* STATS */}
        <div className="mt-14 grid grid-cols-3 gap-8 max-w-2xl mx-auto text-center">
          <div>
            <h3 className="text-3xl font-bold text-red-600">10K+</h3>
            <p className="text-gray-500 text-sm">Registered Donors</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-red-600">500+</h3>
            <p className="text-gray-500 text-sm">Lives Saved</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-red-600">24/7</h3>
            <p className="text-gray-500 text-sm">Availability</p>
          </div>
        </div>
      </div>

      {/* 🧊 FLOATING GLASS CARDS */}

      {/* TOP LEFT */}
      <div className="hidden xl:block absolute left-10 top-32 bg-white/70 backdrop-blur-md px-5 py-3 rounded-xl border border-red-100 shadow">
        📍 Live Location Matching
      </div>

      {/* TOP RIGHT */}
      <div className="hidden xl:block absolute right-10 top-32 bg-white/70 backdrop-blur-md px-5 py-3 rounded-xl border border-red-100 shadow">
        ⚡ Instant Contact
      </div>

      {/* BOTTOM LEFT */}
      <div className="hidden xl:block absolute left-16 bottom-24 bg-white/70 backdrop-blur-md px-5 py-3 rounded-xl border border-red-100 shadow">
        🛡 Verified Donors
      </div>

      {/* 🔥 NEW — BOTTOM RIGHT */}
      <div className="hidden xl:block absolute right-16 bottom-24 bg-white/70 backdrop-blur-md px-5 py-3 rounded-xl border border-red-100 shadow">
        ❤️ 24/7 Emergency Support
      </div>

    </section>
  );
};

export default Hero;
