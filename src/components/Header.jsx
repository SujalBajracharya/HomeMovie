import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiHome, FiShoppingCart, FiLogIn, FiUserPlus, FiMenu, FiX, FiLogOut } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { cart_items } = useSelector((store) => store.cartStore);
  const loggedInUser = useSelector((store) => store.userStore.loggedInUser);

  let length = cart_items.length;

  // Handle scroll for navbar background transparency
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 px-6 md:px-12 py-4 ${
        scrolled 
        ? "bg-background-DEFAULT/90 backdrop-blur-md border-b border-white/10 shadow-lg py-3" 
        : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        {/* Logo */}
        <Link 
          to="/" 
          className="text-2xl font-black text-brand-red tracking-tighter hover:scale-105 transition-transform"
        >
          MOVIE<span className="text-text-primary">HOUSE</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-wider">
          <li>
            <Link 
              to="/" 
              className={`hover:text-brand-red transition-colors flex items-center gap-2 ${location.pathname === '/' ? 'text-brand-red' : 'text-text-primary'}`}
            >
              Home
            </Link>
          </li>

          <li>
            <Link 
              to="/cart" 
              className={`hover:text-brand-red transition-colors flex items-center gap-2 relative ${location.pathname === '/cart' ? 'text-brand-red' : 'text-text-primary'}`}
            >
              Watchlist
              {length > 0 && (
                <span className="absolute -top-2 -right-4 bg-brand-red text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {length}
                </span>
              )}
            </Link>
          </li>

          {!loggedInUser?.username && !loggedInUser?.email ? (
            <div className="flex items-center gap-4 ml-4">
              <li>
                <Link 
                  to="/login" 
                  className="text-text-primary hover:text-brand-red transition-colors"
                >
                  Login
                </Link>
              </li>

              <li>
                <Link 
                  to="/register" 
                  className="bg-brand-red text-white px-5 py-2 rounded-lg hover:bg-brand-redHover transition-colors shadow-glow"
                >
                  Join Now
                </Link>
              </li>
            </div>
          ) : (
            <div className="flex items-center gap-6 ml-4 border-l border-white/10 pl-6">
              <li className="text-text-secondary normal-case font-medium">
                {loggedInUser.username || loggedInUser.email}
              </li>
              <li>
                <button
                  onClick={() => { dispatch({ type: "LOGOUT" }); navigate('/'); }}
                  className="p-2 bg-white/10 rounded-lg hover:bg-brand-red hover:text-white transition-all text-text-primary"
                  title="Logout"
                >
                  <FiLogOut size={18} />
                </button>
              </li>
            </div>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-text-primary p-2 overflow-hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background-elevated border-b border-white/10 py-8 px-6 flex flex-col gap-6 shadow-2xl animate-in slide-in-from-top duration-300">
          <Link
            to="/"
            className="text-lg font-bold text-text-primary flex items-center gap-3"
            onClick={() => setIsOpen(false)}
          >
            <FiHome /> Home
          </Link>

          <Link
            to="/cart"
            className="text-lg font-bold text-text-primary flex items-center gap-3"
            onClick={() => setIsOpen(false)}
          >
            <FiShoppingCart /> Watchlist ({length})
          </Link>

          <div className="h-px bg-white/10 my-2" />

          {!loggedInUser?.username && !loggedInUser?.email ? (
            <>
              <Link
                to="/login"
                className="text-lg font-bold text-text-primary"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-brand-red text-white text-center py-3 rounded-xl font-bold"
                onClick={() => setIsOpen(false)}
              >
                Join Now
              </Link>
            </>
          ) : (
            <button
              onClick={() => {
                dispatch({ type: "LOGOUT" });
                setIsOpen(false);
                navigate('/');
              }}
              className="bg-white/10 text-text-primary text-center py-3 rounded-xl font-bold flex items-center justify-center gap-3"
            >
              <FiLogOut /> Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Header;
