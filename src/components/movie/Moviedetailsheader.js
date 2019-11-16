import React from "react";
import { connect } from "react-redux";

import {
  addToWatchlist,
  delFromWatchlist
} from "../../actions/watchlistActions.js";

import favIcon from "../../images/baseline-favorite-24px.svg";

//takes a movie object and returns a renderable display for that object with add and remove from watchlist functionality
const Moviedetailsheader = ({
  addToWatchlist,
  delFromWatchlist,
  movie,
  toggleWL
}) => {
  const {
    Title,
    Year,
    Runtime,
    Rated,
    Genre,
    Released,
    imdbRating,
    Country,
    imdbID
  } = movie;
  return (
    <div className="movie-details-header">
      <h1 className="movie-details-header-title ">
        {`${Title} (${Year})`}
        <div
          className="movie-details-header-rating"
          style={{ lineHeight: "40px" }}
        >
          <i
            className="material-icons text-yellow-500 float-left mr-4"
            style={{ fontSize: "40px" }}
          >
            star
          </i>
          {` ${imdbRating}`}
        </div>
      </h1>

      <div className="movie-details-header-info">
        {Rated !== "N/A" && Rated + " | "}
        {Runtime !== "N/A" && Runtime + " | "}
        {Genre !== "N/A" && Genre + " | "}
        {Released !== "N/A" && Released + " | "}({Country !== "N/A" && Country})
      </div>

      <div className="movie-details-header-btn ">
        {movie.watchlist ? (
          <i className="material-icons btn remove" onClick={e => delFromWatchlist(imdbID)}>
            favorite
          </i>
        ) : (
          <i className="material-icons btn add" onClick={e => addToWatchlist(movie)}>
            favorite
          </i>
        )}
        <a href={`https://www.imdb.com/title/${imdbID}`} className="btn neutral">
          Go to IMDB
        </a>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  movie: state.movieDetails,
  auth: state.firebase.auth
});

export default connect(
  mapStateToProps,
  {
    addToWatchlist,
    delFromWatchlist
  }
)(Moviedetailsheader);
