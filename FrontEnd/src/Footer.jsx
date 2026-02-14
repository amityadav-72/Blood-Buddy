import React from "react";
import logo from "./photo/logo (2).png";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-3 text-sm">

        {/* LEFT — BRAND + COPYRIGHT */}
        <div className="flex items-center gap-3 text-gray-600">
          <img src={logo} alt="BloodBuddy" className="h-7 w-auto" />
          <span className="hidden sm:inline">
            © {new Date().getFullYear()} BloodBuddy
          </span>
        </div>

        {/* CENTER — TAGLINE */}
        <p className="hidden lg:block text-xs text-gray-400 tracking-wide">
          Connecting donors with recipients in emergencies
        </p>

        {/* RIGHT — NAVIGATION */}
        <nav className="flex items-center gap-6 font-medium text-gray-500">
          <a
            href="/about"
            className="hover:text-red-600 transition-colors duration-200"
          >
            About
          </a>
          <a
            href="/find-donor"
            className="hover:text-red-600 transition-colors duration-200"
          >
            Find Donor
          </a>
          <a
            href="/become-donor"
            className="hover:text-red-600 transition-colors duration-200"
          >
            Become Donor
          </a>
        </nav>

      </div>
    </footer>
  );
};

export default Footer;
