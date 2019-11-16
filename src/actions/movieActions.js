import { FETCHED_MOVIE_DETAILS } from "./types";

const api = "48946d13";

//lookup by specific title
export const fetchMovieDetails = id => (dispatch, getState) => {
  const watchlist = getState().watchlist.movies;

  dispatch({type: 'UI_LOADING_INIT'})

  fetch(`https://www.omdbapi.com/?apikey=${api}&i=${id}&plot=full`)
    .then(res => res.json())
    .then(movie => {
      //check is fetched movie exsists in watchlist
      let alreadyAdded = m => m.imdbID === movie.imdbID;
      movie.watchlist = watchlist.some(alreadyAdded);
      dispatch({
        type: FETCHED_MOVIE_DETAILS,
        payload: movie
      });
      dispatch({type: 'UI_LOADING_COMPLETE'})

    })
};
