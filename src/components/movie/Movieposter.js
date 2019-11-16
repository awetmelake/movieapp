import React from "react";
import { Link } from "react-router-dom";

//styles
import "./Movie.scss";

//icons
import noImg from "../../images/img-unavailable.png";

const Movieposter = ({
  movie,
  fetchMovieDetails,
  addToWatchlist,
  delFromWatchlist
}) => (
  <Link key={movie.imdbID} to={`/movie-details/${movie.imdbID}`}>
    <div className="movie-poster">
      <div onClick={e => fetchMovieDetails(movie.imdbID)}>
        <img
          className="movie-poster-img"
          src={movie.Poster}
          onError={e => (e.target.src = noImg)}
        />

        <p className="mt-3 text-center" style={{fontFamily: "Roboto"}}>
          {movie.Title + " (" + movie.Year + ")"}
        </p>
      </div>
    </div>
  </Link>
);

export default Movieposter;
