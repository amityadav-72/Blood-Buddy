import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "./photo/logo (2).png";

const Navbar = ({ navMode }) => {
  const [open, setOpen] = useState(false);

  // 👉 Close mobile menu when nav mode starts
  useEffect(() => {
    if (navMode) setOpen(false);
  }, [navMode]);

  return (
    <header
      className={`
        ${navMode ? "hidden" : "flex"}
        w-full items-center bg-white border-b shadow-sm
        fixed top-0 left-0 z-50 transition-all duration-300
      `}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">

          {/* LOGO */}
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="logo" className="w-8 h-8" />
            <span className="text-xl font-bold text-blue-600 tracking-wide">
              BloodBuddy
            </span>
          </Link>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden text-blue-600 focus:outline-none"
          >
            {open ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          {/* NAV LINKS */}
          <nav
            className={`
              ${open ? "block" : "hidden"}
              absolute top-[64px] left-0 w-full bg-white border-t
              lg:border-none lg:static lg:block lg:w-auto
              transition-all duration-300
            `}
          >
            <ul className="flex flex-col lg:flex-row lg:items-center lg:space-x-10 px-6 lg:px-0 py-4 lg:py-0">

              <ListItem NavLink="/" onClick={() => setOpen(false)}>Home</ListItem>
              <ListItem NavLink="/find-donor" onClick={() => setOpen(false)}>Find Donor</ListItem>
              <ListItem NavLink="/about" onClick={() => setOpen(false)}>About Us</ListItem>
              <ListItem NavLink="/become-donor" onClick={() => setOpen(false)}>Become Donor</ListItem>

            </ul>
          </nav>

        </div>
      </div>
    </header>
  );
};

export default Navbar;

const ListItem = ({ children, NavLink, onClick }) => (
  <li>
    <Link
      to={NavLink}
      onClick={onClick}
      className="block py-2 text-gray-700 font-medium hover:text-blue-600 transition-colors duration-200"
    >
      {children}
    </Link>
  </li>
);
