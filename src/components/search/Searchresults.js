import React, { Component } from "react";
import { connect } from "react-redux";

//actions
import { fetchMovieDetails } from "../../actions/movieActions";
import { fetchMovies } from "../../actions/searchActions";
import { addToWatchlist } from "../../actions/watchlistActions.js";

//components
import Movieposter from "../movie/Movieposter";
import LoadingSpinner from "../loading/LoadingSpinner";

//styles
import "./Search.scss";

class Searchresults extends Component {
  componentDidMount() {
    if (!this.props.searched.length) {
      this.props.fetchMovies(this.props.match.params.title);
    }
  }

  state = {
    page: 1
  };

  componentDidUpdate(prevProps, prevState) {
    //reset state to page 1 if user looks up another title
    if (prevProps !== this.props) {
      this.setState({
        page: 1
      });
    }
    //scrolltop on user page change
    if (prevState !== this.state) {
      window.scrollTo(0, 0);
    }
  }

  //handle user page change
  handlePage = e => {
    const { Search } = this.props.searched;
    let { page } = this.state;
    if (e.target.value === "increment" && page < Search.length) {
      this.setState({
        page: (page += 1)
      });
    } else if (e.target.value === "decrement" && page > 1) {
      this.setState({
        page: (page -= 1)
      });
    }
  };

  render() {
    const {
      searched,
      fetchMovieDetails,
      addToWatchlist,
      delFromWatchlist,
      loading
    } = this.props;
    const { page } = this.state;

    //paginate results
    let pages = [];
    searched.Search.map(page =>
      pages.push(
        page.map(movie => (
          <Movieposter
            key={movie.imdbId}
            movie={movie}
            watchlist={movie.watchlist}
            fetchMovieDetails={fetchMovieDetails}
            addToWatchlist={addToWatchlist}
            delFromWatchlist={delFromWatchlist}
          />
        ))
      )
    );
    if (loading) {
      return <LoadingSpinner />;
    }
    return (
      <div className="search">
        {searched.totalResults ? (
          <>
            <h1>Search Results: {searched.totalResults}</h1>
            <div
              data-aos="fade-in"
              data-aos-delay="100"
              className="search-results "
            >
              {pages[page - 1]}
            </div>

            <div className="search-results-page-nav-btn">
              <button
                value="decrement"
                onClick={e => this.handlePage(e)}
                className="bg-purple-900"
              >
                LAST
              </button>

              <button
                value="increment"
                onClick={e => this.handlePage(e)}
                className="bg-purple-900"
              >
                NEXT
              </button>
            </div>
          </>
        ) : (
          <h1>{searched.Error}</h1>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  searched: state.searched,
  loading: state.ui.isLoading
});

export default connect(
  mapStateToProps,
  { fetchMovieDetails, addToWatchlist, fetchMovies }
)(Searchresults);
