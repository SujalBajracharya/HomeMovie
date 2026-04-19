import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Details = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { movies } = useSelector((store) => store.itemStore);
  const cart = useSelector((store) => store.cartStore);

  const movie = movies?.find((item) => String(item.id) === String(id)) || null;
  const inCart = cart?.cart_items?.some((i) => String(i.id) === String(id));

  const handleAddRemove = () => {
    if (!movie) return;
    if (inCart) {
      Swal.fire({
        title: "Removed",
        text: "Removed from your watchlist",
        icon: "info",
        background: "#141414",
        color: "#F0F0F0",
        confirmButtonColor: "#E50914"
      });
      dispatch({ type: "REMOVE_FROM_CART", payload: movie.id });
    } else {
      Swal.fire({
        title: "Added!",
        text: "Added to your watchlist",
        icon: "success",
        background: "#141414",
        color: "#F0F0F0",
        confirmButtonColor: "#E50914"
      });
      dispatch({ type: "ADD_TO_CART", payload: movie });
    }
  };

  if (!movie) {
    return (
      <div className="min-h-screen bg-background-DEFAULT flex items-center justify-center text-text-primary px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Movie Not Found</h2>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-brand-red rounded-lg font-bold hover:bg-brand-redHover transition-colors"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-DEFAULT text-text-primary pb-20">
      {/* HERO BACKDROP */}
      <div className="relative h-[50vh] lg:h-[70vh] w-full overflow-hidden">
        <img
          src={movie.primaryImage}
          alt={movie.primaryTitle}
          className="w-full h-full object-cover object-top opacity-30 scale-110 blur-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background-DEFAULT via-background-DEFAULT/60 to-transparent"></div>

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-8 left-8 z-20 p-3 bg-black/40 backdrop-blur-md rounded-full border border-white/10 hover:bg-white/10 transition-colors group"
        >
          <svg className="w-6 h-6 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      {/* CONTENT CONTAINER */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 -mt-40 lg:-mt-64 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* POSTER ASIDE */}
          <div className="lg:w-1/3 flex-shrink-0">
            <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/50 aspect-[2/3] border border-white/5 bg-background-elevated">
              <img
                src={movie.primaryImage}
                alt={movie.primaryTitle}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="mt-8 space-y-4">
              <button
                onClick={handleAddRemove}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-3 ${inCart
                    ? "bg-text-disabled text-text-primary hover:bg-gray-700"
                    : "bg-brand-red text-white hover:bg-brand-redHover shadow-glow"
                  }`}
              >
                {inCart ? (
                  <>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    In Watchlist
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                    Add to Watchlist
                  </>
                )}
              </button>

              <div className="grid grid-cols-2 gap-3">
                {movie.trailer && (
                  <a
                    href={movie.trailer}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-semibold border border-white/10 transition-colors"
                  >
                    Trailer
                  </a>
                )}
                {movie.url && (
                  <a
                    href={movie.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 py-3 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-500 rounded-xl font-semibold border border-yellow-500/20 transition-colors"
                  >
                    IMDb
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* INFO SECTION */}
          <div className="lg:w-2/3 pt-4 lg:pt-12">
            <div className="flex items-center gap-4 mb-4 flex-wrap">
              <span className="text-brand-red font-bold text-lg">★ {movie.averageRating}</span>
              <span className="text-text-secondary">•</span>
              <span className="text-text-primary font-medium">{movie.startYear}</span>
              <span className="text-text-secondary">•</span>
              <span className="text-text-primary font-medium">{movie.runtimeMinutes} min</span>
              {movie.genres && movie.genres.map(genre => (
                <span key={genre} className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold uppercase tracking-wider text-text-secondary">
                  {genre}
                </span>
              ))}
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              {movie.primaryTitle}
            </h1>

            <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-10 max-w-3xl">
              {movie.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 border-t border-white/10">
              {movie.originalTitle && (
                <div>
                  <h4 className="text-text-disabled uppercase text-xs font-black tracking-widest mb-1">Original Title</h4>
                  <p className="text-text-primary font-medium">{movie.originalTitle}</p>
                </div>
              )}
              {movie.releaseDate && (
                <div>
                  <h4 className="text-text-disabled uppercase text-xs font-black tracking-widest mb-1">Release Date</h4>
                  <p className="text-text-primary font-medium">{movie.releaseDate}</p>
                </div>
              )}
              {movie.countriesOfOrigin && movie.countriesOfOrigin.length > 0 && (
                <div>
                  <h4 className="text-text-disabled uppercase text-xs font-black tracking-widest mb-1">Origin</h4>
                  <p className="text-text-primary font-medium">{movie.countriesOfOrigin.join(', ')}</p>
                </div>
              )}
              {movie.spokenLanguages && movie.spokenLanguages.length > 0 && (
                <div>
                  <h4 className="text-text-disabled uppercase text-xs font-black tracking-widest mb-1">Languages</h4>
                  <p className="text-text-primary font-medium">{movie.spokenLanguages.join(', ')}</p>
                </div>
              )}
              {movie.budget && (
                <div>
                  <h4 className="text-text-disabled uppercase text-xs font-black tracking-widest mb-1">Budget</h4>
                  <p className="text-text-primary font-medium">${movie.budget.toLocaleString()}</p>
                </div>
              )}
              {movie.grossWorldwide && (
                <div>
                  <h4 className="text-text-disabled uppercase text-xs font-black tracking-widest mb-1">Box Office</h4>
                  <p className="text-text-primary font-medium">${movie.grossWorldwide.toLocaleString()}</p>
                </div>
              )}
            </div>

            {movie.productionCompanies && movie.productionCompanies.length > 0 && (
              <div className="mt-8 pt-8 border-t border-white/10">
                <h4 className="text-text-disabled uppercase text-xs font-black tracking-widest mb-4">Production</h4>
                <div className="flex flex-wrap gap-4">
                  {movie.productionCompanies.map((c, idx) => (
                    <span key={idx} className="bg-background-elevated px-4 py-2 rounded-lg border border-white/5 text-sm font-medium">
                      {c.company}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Details;

