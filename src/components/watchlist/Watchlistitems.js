import React from "react";

import Movieposter from "../movie/Movieposter";

import "./Watchlist.scss";

//renders movieitems from state.watchlist.movies passed as prop from parent Watchlist component
const Watchlistitems = ({
  watchlist,
  fetchMovieDetails,
  addToWatchlist,
  delFromWatchlist
}) => {
  if (watchlist && watchlist !== undefined) {
    return watchlist.map(movie => (
      <Movieposter
        key={movie.imdbID}
        maxWidth={"300px"}
        movie={movie}
        watchlist={movie.watchlist}
        fetchMovieDetails={fetchMovieDetails}
        addToWatchlist={addToWatchlist}
        delFromWatchlist={delFromWatchlist}
      />
    ));
  }
};

export default Watchlistitems;
