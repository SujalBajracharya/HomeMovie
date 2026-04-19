import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MovieCard from "../components/MovieCard";

const PAGE_SIZE = 18;

const HomePage = () => {
  const { movies } = useSelector((store) => store.itemStore);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Derive top movie for the Hero section
  const heroMovie = movies.length > 0 ? movies[0] : null;

  const filteredResults = useMemo(() => {
    if (!search.trim()) return movies;
    return movies.filter((movie) =>
      movie.primaryTitle.toLowerCase().includes(search.toLowerCase())
    );
  }, [movies, search]);

  const currentMovies = useMemo(() => {
    // If searching, hide hero movie from grid. If not, slice normally.
    return filteredResults.slice(0, visibleCount);
  }, [filteredResults, visibleCount]);

  useEffect(() => {
    if (movies.length === 0) {
      fetch("https://imdb236.p.rapidapi.com/api/imdb/top250-movies", {
        method: "GET",
        headers: {
          "x-rapidapi-host": "imdb236.p.rapidapi.com",
          "x-rapidapi-key": "56cad67cfdmsh11e7a1ea69985a0p15c05ejsn9a4744f977a7", // Secure this in .env later
        },
      })
        .then((res) => res.json())
        .then((data) => dispatch({ type: "LOAD_DB", payload: data }))
        .catch((err) => console.error("Failed to load movies", err));
    }
  }, [dispatch, movies.length]);

  // Reset pagination when searching
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [search]);

  return (
    <div className="bg-background-DEFAULT min-h-screen text-text-primary selection:bg-brand-red selection:text-white pb-16">

      {/* 🎭 Hero Section */}
      {!search && heroMovie && (
        <div className="relative w-full h-[65vh] lg:h-[80vh] flex items-end pb-16 lg:pb-24">

          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src={heroMovie.primaryImage}
              alt={heroMovie.primaryTitle}
              className="w-full h-full object-cover object-top opacity-40"
            />

            {/* Cinematic Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-background-DEFAULT via-background-DEFAULT/40 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-background-DEFAULT via-background-DEFAULT/20 to-transparent"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">
            <div className="max-w-2xl">

              <span className="text-brand-red font-bold text-sm uppercase tracking-widest mb-3 block">
                #1 Top Rated
              </span>

              <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                {heroMovie.primaryTitle}
              </h1>

              <p className="text-text-secondary text-lg mb-8 line-clamp-3">
                {heroMovie.description ||
                  "Experience the critically acclaimed masterpiece shaping cinematic history."}
              </p>

              <div className="flex gap-4">
                <button
                  onClick={() => navigate(`/${heroMovie.id}`)}
                  className="bg-background-elevated/80 backdrop-blur-md text-white px-8 py-3 rounded-lg font-bold hover:scale-105 active:scale-95 transition-all duration-200 border border-white/10"
                >
                  More Info
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-6 md:px-12 pt-12 relative z-10">

        {/* 🔍 Search Input */}
        <div className="mb-10 max-w-2xl">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-text-secondary group-focus-within:text-brand-red transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="search"
              placeholder="Search by title..."
              className="w-full bg-background-paper border border-white/10 rounded-xl pl-12 pr-4 py-4 text-sm font-medium transition-all duration-300 ease-in-out focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red placeholder:text-text-disabled"
            />
          </div>
        </div>

        {/* 🎯 Section Header */}
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-2xl font-bold">
            {search ? `Results for "${search}"` : "Trending Movies"}
          </h2>
          <span className="text-sm font-medium text-text-secondary bg-background-elevated px-3 py-1 rounded-full">
            {filteredResults.length} Titles
          </span>
        </div>

        {/* 🎥 Movie Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 mb-12">
          {currentMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        {/* 📄 Elegant Load More */}
        {visibleCount < filteredResults.length && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
              className="group px-8 py-3 rounded-full border border-white/20 bg-background-paper hover:bg-brand-red hover:border-brand-red transition-all duration-300 font-semibold flex items-center justify-center gap-2"
            >
              Load More
              <svg className="h-4 w-4 transform group-hover:translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;
