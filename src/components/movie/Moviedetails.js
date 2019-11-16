import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";

// actions
import { fetchMovieDetails } from "../../actions/movieActions";

// components
import Moviedetailsheader from "./Moviedetailsheader";
import LoadingSpinner from "../loading/LoadingSpinner";
import NoMatch from "../NoMatch";

import noImg from "../../images/img-unavailable.png";

class Moviedetails extends Component {
  componentDidMount() {
    if (!this.props.movie.length) {
      this.props.fetchMovieDetails(this.props.match.params.id);
    }
  }

  render() {
    const { movie, isLoading, err } = this.props;

    if (!isLoading && movie.Response === "True") {
      return (
        <div className="movie-details bg-gray-100">
          <Moviedetailsheader />

          <div className="movie-details-info">
            <img
              src={movie.Poster}
              alt=""
              onError={e => (e.target.src = noImg)}
            />
            <ul>
              <li>
                <strong>Director:</strong> {movie.Director}
              </li>
              <li>
                <strong>Writer:</strong>{" "}
                {movie.Writer !== "N/A"
                  ? movie.Writer.split(",")[0] +
                    ", " +
                    movie.Writer.split(",")[1] +
                    movie.Writer.split(",")[2]
                  : "N/A"}
              </li>
              <li>
                <strong>Actors:</strong> {movie.Actors}
              </li>
              <li>
                <strong>Plot:</strong> {movie.Plot}
              </li>
            </ul>
          </div>
          <p className="err" style={{color : 'red', textAlign: 'center', margin: '20px 0'}}>
            {err}
          </p>
        </div>
      );
    } else if (!isLoading && movie.Response === "False") {
      return <Redirect to="/" />;
    } else {
      return <LoadingSpinner />;
    }
  }
}

const mapStateToProps = state => ({
  movie: state.movieDetails,
  users: state.firestore.ordered.users || [],
  auth: state.firebase.auth,
  err: state.watchlist.err,
  loading: state.ui.isLoading
});

export default compose(
  connect(
    mapStateToProps,
    { fetchMovieDetails }
  ),
  firestoreConnect(props => [`users/${props.auth.uid}/watchlist`])
)(Moviedetails);
