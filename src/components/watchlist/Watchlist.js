import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import {
  addToWatchlist,
  delFromWatchlist,
  fetchUserWatchlist
} from "../../actions/watchlistActions.js";
import { fetchMovieDetails } from "../../actions/movieActions.js";

import Movieposter from "../movie/Movieposter";
import LoadingSpinner from "../loading/LoadingSpinner";

import "./Watchlist.scss";

class Watchlist extends Component {
  componentDidMount() {
    this.props.fetchUserWatchlist();
  }
  render() {
    const {
      watchlist,
      fetchMovieDetails,
      addToWatchlist,
      delFromWatchlist,
      auth,
      loading
    } = this.props;
    if (!auth.uid) return <Redirect to="/" />;
    let movieWatchlist = [];
    let tvWatchlist = [];
    let otherWatchlist = [];

    movieWatchlist = watchlist.map(
      movie =>
        movie.Type === "movie" && (
          <Movieposter
            key={movie.imdbID}
            maxWidth={"300px"}
            movie={movie}
            watchlist={movie.watchlist}
            fetchMovieDetails={fetchMovieDetails}
            addToWatchlist={addToWatchlist}
            delFromWatchlist={delFromWatchlist}
          />
        )
    );

    tvWatchlist = watchlist.map(
      movie =>
        movie.Type === "series" && (
          <Movieposter
            key={movie.imdbID}
            maxWidth={"300px"}
            movie={movie}
            watchlist={movie.watchlist}
            fetchMovieDetails={fetchMovieDetails}
            addToWatchlist={addToWatchlist}
            delFromWatchlist={delFromWatchlist}
          />
        )
    );

    otherWatchlist = watchlist.map(
      movie =>
        movie.Type === "game" && (
          <Movieposter
            key={movie.imdbID}
            maxWidth={"300px"}
            movie={movie}
            watchlist={movie.watchlist}
            fetchMovieDetails={fetchMovieDetails}
            addToWatchlist={addToWatchlist}
            delFromWatchlist={delFromWatchlist}
          />
        )
    );

    if (auth.uid) {
      return (
        <div className="watch-list">
          <h1>Watch List</h1>

          {loading ? (
            <LoadingSpinner />
          ) : watchlist.length < 1 ? (
            <h3>Your watchlist is empty</h3>
          ) : (
            <div>
              <h3 className="watch-list-section-title">Movies</h3>
              <hr />

              <div
                data-aos="fade-in"
                data-aos-delay="100"
                className="watch-list-items"
              >
                {movieWatchlist}
              </div>
              <br />
              <br />
              <br />
              <br />
              <h3 className="watch-list-section-title">Shows</h3>
              <hr />
              <div
                data-aos="fade-in"
                data-aos-delay="100"
                className="watch-list-items"
              >
                {tvWatchlist}
              </div>

              <br />
              <h3 className="watch-list-section-title">Games</h3>
              <hr />
              <div
                data-aos="fade-in"
                data-aos-delay="100"
                className="watch-list-items"
              >
                {otherWatchlist}
              </div>
            </div>
          )}
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  watchlist: state.watchlist.movies,
  loading: state.ui.isLoading
});

export default connect(
  mapStateToProps,
  { fetchMovieDetails, addToWatchlist, delFromWatchlist, fetchUserWatchlist }
)(Watchlist);
