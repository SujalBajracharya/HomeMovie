import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiHome, FiShoppingCart, FiLogIn, FiUserPlus, FiMenu, FiX } from "react-icons/fi";
import { useSelector } from "react-redux";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace with actual auth
  const {cart_items} = useSelector((store) => store.cartStore);

  let length =cart_items.length;

  return (
    <nav className="w-full bg-gray-300 shadow-md px-6 py-4">
      <div className="flex justify-between items-center">

        {/* Logo */}
        <div className="text-2xl font-bold text-primary cursor-pointer">
          Sujal's Movie House
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          <li>
            <Link 
              to="/" 
              className="flex items-center gap-2 hover:text-primary transition"
            >
              <FiHome size={20} /> Home
            </Link>
          </li>

          <li>
            <Link 
              to="/cart" 
              className="flex items-center gap-2 hover:text-primary transition"
            >
              <FiShoppingCart size={20} /> Cart {length}
            </Link>
          </li>

          {!isLoggedIn && (
            <>
              <li>
                <Link 
                  to="/login" 
                  className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-light-primary transition"
                >
                  <FiLogIn size={20} /> Login
                </Link>
              </li>

              <li>
                <Link 
                  to="/register" 
                  className="flex items-center gap-2 border border-primary text-primary px-4 py-2 rounded-md hover:bg-primary hover:text-white transition"
                >
                  <FiUserPlus size={20} /> Register
                </Link>
              </li>
            </>
          )}

          {isLoggedIn && (
            <li>
              <button
                onClick={() => setIsLoggedIn(false)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
              >
                Logout
              </button>
            </li>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <ul className="md:hidden mt-4 flex flex-col gap-4 bg-white py-4 px-2 rounded-md shadow">

          <Link
            to="/"
            className="flex items-center gap-2 text-gray-700 hover:text-primary transition"
            onClick={() => setIsOpen(false)}
          >
            <FiHome size={20} /> Home
          </Link>

          <Link
            to="/cart"
            className="flex items-center gap-2 text-gray-700 hover:text-primary transition"
            onClick={() => setIsOpen(false)}
          >
            <FiShoppingCart size={20} /> Cart
          </Link>

          {!isLoggedIn && (
            <>
              <Link
                to="/login"
                className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-light-primary transition"
                onClick={() => setIsOpen(false)}
              >
                <FiLogIn size={20} /> Login
              </Link>

              <Link
                to="/register"
                className="flex items-center gap-2 border border-primary text-primary px-4 py-2 rounded-md hover:bg-primary hover:text-white transition"
                onClick={() => setIsOpen(false)}
              >
                <FiUserPlus size={20} /> Register
              </Link>
            </>
          )}

          {isLoggedIn && (
            <button
              onClick={() => {
                setIsLoggedIn(false);
                setIsOpen(false);
              }}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
            >
              Logout
            </button>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Header;
