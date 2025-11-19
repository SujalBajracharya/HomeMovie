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
      Swal.fire(
        "Attention",
        "This movie is being removed from the Cart",
        "warning"
      );
      dispatch({ type: "REMOVE_FROM_CART", payload: movie.id });
    } else {
      Swal.fire(
        "Congrats",
        "This movie is has been successfully added to the Cart",
        "success"
      );

      dispatch({ type: "ADD_TO_CART", payload: movie });
    }
  };

  // helper to render array lists
  const renderList = (label, arr) => {
    if (!arr || arr.length === 0) return null;
    return (
      <div className="mb-3">
        <div className="text-sm text-gray-200 mb-1">{label}</div>
        <div className="flex flex-wrap gap-2">
          {arr.map((item, idx) => (
            <span key={idx} className="text-xs bg-gray-950 px-2 py-1 rounded">
              {typeof item === "string"
                ? item
                : item?.company || item?.name || JSON.stringify(item)}
            </span>
          ))}
        </div>
      </div>
    );
  };

  // helper to render single fields
  const renderField = (label, value) => {
    if (!value && value !== 0) return null;
    return (
      <div className="mb-2">
        <span className="text-sm text-gray-200 mr-2">{label}:</span>
        <span className="text-gray-200">{value}</span>
      </div>
    );
  };

  return (
    <div className="p-6">
      {movie ? (
        <div className="max-w-5xl mx-auto bg-gray-800 shadow rounded-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* LEFT SIDEBAR */}
            <div className="md:w-1/3 w-full bg-gray-800 p-4 flex-shrink-0">
              <img
                src={movie.primaryImage}
                alt={movie.primaryTitle}
                className="w-full h-96 object-cover rounded"
              />

              <div className="mt-4">
                {renderField("Original Title", movie.originalTitle)}
                {renderField("Year", movie.startYear)}
                {renderField("Runtime", movie.runtimeMinutes + " min")}
                {renderField(
                  "Rating",
                  movie.averageRating ? `⭐ ${movie.averageRating} / 10` : null
                )}
                {renderField("Votes", movie.numVotes)}
                {renderField("Metascore", movie.metascore)}
                {renderField(
                  "Budget",
                  movie.budget ? `$${movie.budget.toLocaleString()}` : null
                )}
                {renderField(
                  "Worldwide Gross",
                  movie.grossWorldwide
                    ? `$${movie.grossWorldwide.toLocaleString()}`
                    : null
                )}
              </div>
            </div>

            {/* RIGHT CONTENT */}
            <div className="md:w-2/3 w-full p-6 flex flex-col">
              <h1 className="text-3xl font-bold mb-2 text-gray-900">
                {movie.primaryTitle}
              </h1>

              <p className="text-gray-200 mb-4">{movie.description}</p>

              {renderList("Genres", movie.genres)}
              {renderList("Countries", movie.countriesOfOrigin)}
              {renderList("Languages", movie.spokenLanguages)}
              {renderList("Filming Locations", movie.filmingLocations)}
              {renderList(
                "Production Companies",
                movie.productionCompanies?.map((c) => c.company)
              )}
              {renderList("Tags / Interests", movie.interests)}
              {renderList(
                "Thumbnails",
                movie.thumbnails?.map((t) => t.url)
              )}

              {renderField("Release Date", movie.releaseDate)}

              <div className="mt-6 flex gap-3 flex-wrap">
                {/* Add / Remove Cart */}
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                  onClick={handleAddRemove}
                >
                  {inCart ? "Remove from Cart" : "Add to Cart"}
                </button>

                {/* Back */}
                <button
                  className="px-4 py-2 bg-gray-300 text-black rounded"
                  onClick={() => navigate(-1)}
                >
                  Back
                </button>

                {/* Trailer */}
                {movie.trailer && (
                  <a
                    href={movie.trailer}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-red-600 text-white rounded"
                  >
                    Watch Trailer
                  </a>
                )}

                {/* IMDb Link */}
                {movie.url && (
                  <a
                    href={movie.url}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-yellow-500 text-black rounded"
                  >
                    Open on IMDb
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center">Movie not found.</p>
      )}
    </div>
  );
};

export default Details;
