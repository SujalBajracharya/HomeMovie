import React from "react";

const MovieCard = ({ movie }) => {
  return (
    <div className="w-64 bg-white shadow-md rounded-lg overflow-hidden hover:scale-105 transition cursor-pointer">
      <img
        src={movie.primaryImage}
        alt={movie.primaryTitle}
        className="w-full h-80 object-cover"
      />

      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">{movie.primaryTitle}</h2>

        <p className="text-sm text-gray-600 line-clamp-3">
          {movie.description}
        </p>

        <div className="mt-3 font-semibold">
          ⭐ {movie.averageRating} / 10
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
