import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Cart = () => {
  let { cart_items } = useSelector((store) => store.cartStore);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
    Swal.fire({
      title: "Removed",
      text: "Removed from your watchlist",
      icon: "info",
      background: "#141414",
      color: "#F0F0F0",
      confirmButtonColor: "#E50914",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const handleClear = () => {
    Swal.fire({
      title: "Clear Watchlist?",
      text: "This will remove all movies from your list.",
      icon: "warning",
      showCancelButton: true,
      background: "#141414",
      color: "#F0F0F0",
      confirmButtonColor: "#E50914",
      cancelButtonColor: "#1F1F1F",
      confirmButtonText: "Yes, clear it",
    }).then((res) => {
      if (res.isConfirmed) {
        dispatch({ type: "CLEAR_CART" });
      }
    });
  };

  return (
    <div className="min-h-screen bg-background-DEFAULT text-text-primary pt-32 pb-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">Your Watchlist</h1>
            <p className="text-text-secondary">{cart_items.length} titles saved for later</p>
          </div>
          {cart_items.length > 0 && (
            <button 
              onClick={handleClear}
              className="text-text-disabled hover:text-brand-red transition-colors text-sm font-bold uppercase tracking-widest"
            >
              Clear All
            </button>
          )}
        </div>

        {cart_items.length === 0 ? (
          <div className="bg-background-paper border border-white/5 rounded-2xl p-16 text-center shadow-xl">
             <div className="w-20 h-20 bg-background-elevated rounded-full flex items-center justify-center mx-auto mb-6 text-text-disabled">
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
             </div>
            <h2 className="text-2xl font-bold mb-4">Your watchlist is empty</h2>
            <p className="text-text-secondary mb-8 max-w-sm mx-auto">Save movies you want to watch later and they'll show up here.</p>
            <button
              onClick={() => navigate('/')}
              className="bg-brand-red text-white px-8 py-3 rounded-xl font-bold hover:bg-brand-redHover transition-colors shadow-glow"
            >
              Discover Movies
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {cart_items.map((item) => (
              <div
                key={item.id}
                className="group relative bg-background-paper border border-white/5 rounded-2xl overflow-hidden flex flex-col md:flex-row items-center transition-all duration-300 hover:border-white/10 hover:shadow-2xl"
              >
                {/* Image Section */}
                <div className="w-full md:w-48 lg:w-64 h-72 md:h-auto aspect-[2/3] flex-shrink-0 overflow-hidden">
                  <Link to={`/${item.id}`}>
                    <img
                      src={item.primaryImage}
                      alt={item.primaryTitle}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </Link>
                </div>

                {/* Info Section */}
                <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-brand-red font-bold text-sm">★ {item.averageRating || "N/A"}</span>
                    <span className="text-text-secondary">•</span>
                    <span className="text-text-secondary text-sm font-medium">{item.startYear}</span>
                  </div>
                  <Link
                    to={`/${item.id}`}
                    className="text-2xl md:text-3xl font-bold text-text-primary hover:text-brand-red transition-colors mb-4 block"
                  >
                    {item.primaryTitle}
                  </Link>
                  <p className="text-text-secondary text-sm md:text-base line-clamp-2 max-w-2xl mb-6">
                    {item.description}
                  </p>
                  
                  <div className="flex items-center gap-4">
                     <button
                      onClick={() => navigate(`/${item.id}`)}
                      className="px-6 py-2 bg-text-primary text-black rounded-lg font-bold text-sm hover:bg-gray-200 transition-colors"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="p-2 text-text-disabled hover:text-brand-red hover:bg-brand-red/10 rounded-lg transition-all"
                    >
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
