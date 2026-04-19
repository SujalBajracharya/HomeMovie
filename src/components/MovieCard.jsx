import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  return (
    <Link to={`/${movie.id}`} className="group relative block overflow-hidden rounded-xl aspect-[2/3] bg-background-elevated shadow-none transition-all duration-300 ease-out hover:scale-105 hover:shadow-card hover:z-10 focus:outline-none focus:ring-2 focus:ring-brand-red">
      {/* Poster Image */}
      <img
        src={movie.primaryImage || '/placeholder-poster.jpg'}
        alt={movie.primaryTitle}
        className="object-cover w-full h-full transition-opacity duration-300 group-hover:opacity-80"
        loading="lazy"
      />

      {/* Persistent Top Overlay (e.g., Rating Badge) */}
      <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md text-xs font-bold text-text-primary border border-white/10">
        ⭐ {movie.averageRating || 'N/A'}
      </div>

      {/* Hover Information Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background-DEFAULT via-background-DEFAULT/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
        <h3 className="text-text-primary font-bold text-lg leading-tight mb-1 truncate">
          {movie.primaryTitle}
        </h3>
        <p className="text-text-secondary text-sm font-medium">
          {movie.startYear} • {movie.genres?.[0] || 'Movie'}
        </p>
      </div>
    </Link>
  );
};

export default MovieCard;
