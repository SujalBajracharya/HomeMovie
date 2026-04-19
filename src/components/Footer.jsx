import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-background-paper text-text-secondary py-16 mt-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* Brand */}
        <div className="space-y-4">
          <Link to="/" className="text-2xl font-black text-brand-red tracking-tighter block">
            MOVIE<span className="text-text-primary">HOUSE</span>
          </Link>
          <p className="text-sm leading-relaxed max-w-xs">
            Your destination for the world's best cinematic experiences. Discover, track, and enjoy your favorite movies.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-text-primary font-bold mb-6 uppercase tracking-widest text-xs">Explore</h3>
          <ul className="space-y-3 text-sm">
            <li><Link to="/" className="hover:text-brand-red transition-colors">Home</Link></li>
            <li><Link to="/" className="hover:text-brand-red transition-colors">Trending</Link></li>
            <li><Link to="/cart" className="hover:text-brand-red transition-colors">Watchlist</Link></li>
            <li><Link to="/login" className="hover:text-brand-red transition-colors">Sign In</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-text-primary font-bold mb-6 uppercase tracking-widest text-xs">Resources</h3>
          <ul className="space-y-3 text-sm">
            <li><button className="hover:text-brand-red transition-colors">About Us</button></li>
            <li><button className="hover:text-brand-red transition-colors">Contact Support</button></li>
            <li><button className="hover:text-brand-red transition-colors">Privacy Policy</button></li>
            <li><button className="hover:text-brand-red transition-colors">API Docs</button></li>
          </ul>
        </div>

        {/* Social Icons */}
        <div>
          <h3 className="text-text-primary font-bold mb-6 uppercase tracking-widest text-xs">Connect</h3>
          <div className="flex space-x-5">
            <button className="p-3 bg-white/5 rounded-full hover:bg-brand-red hover:text-white transition-all transform hover:-translate-y-1">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54v-2.89h2.54V9.845c0-2.507 1.493-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.991 22 12z" /></svg>
            </button>
            <button className="p-3 bg-white/5 rounded-full hover:bg-brand-red hover:text-white transition-all transform hover:-translate-y-1">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h10zm-5 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1-.001 6.001A3 3 0 0 1 12 9zm4.5-3a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" /></svg>
            </button>
            <button className="p-3 bg-white/5 rounded-full hover:bg-brand-red hover:text-white transition-all transform hover:-translate-y-1">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.5 3h3l-7.5 8 8 10h-6l-5-6.5L5 21H2l8-9-8-9h6l4.5 6L17.5 3z" /></svg>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium uppercase tracking-widest text-text-disabled">
        <p>© 2026 MovieHouse — Built for Cinema Lovers by Sujal Bajracharya</p>
        <div className="flex gap-6">
          <button className="hover:text-text-secondary transition-colors">Privacy</button>
          <button className="hover:text-text-secondary transition-colors">Terms</button>
          <button className="hover:text-text-secondary transition-colors">Cookes</button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
