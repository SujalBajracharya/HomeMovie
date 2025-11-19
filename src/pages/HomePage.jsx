import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "../components/MovieCard";
import { Link } from "react-router-dom";

const HomePage = () => {
  let { movies } = useSelector((store) => store.itemStore);
  const dispatch = useDispatch();

  useEffect(() => {
    if (movies.length <= 0) {
      const url = "https://imdb236.p.rapidapi.com/api/imdb/top250-movies";
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-host": "imdb236.p.rapidapi.com",
          "x-rapidapi-key":
            "56cad67cfdmsh11e7a1ea69985a0p15c05ejsn9a4744f977a7",
        },
      };

      fetch(url, options)
        .then((res) => res.json())
        .then((data) =>
          dispatch({
            type: "LOAD_DB",
            payload: data,
          })
        )
        .catch((err) => console.log(err));
    }
  });
  return (
    <>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Top Movies</h1>

        <div className="flex flex-wrap gap-6">
          {movies.map((movie) => (
            <Link to={`${movie.id}`}>
              <MovieCard key={movie.id} movie={movie} />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;
