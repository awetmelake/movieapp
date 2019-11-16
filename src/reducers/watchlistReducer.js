import {
  ADDED_TO_WATCHLIST,
  DELETED_FROM_WATCHLIST,
  FETCHED_USER_WATCHLIST
} from "../actions/types";

const initialState = {
  movies: [],
  err : null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADDED_TO_WATCHLIST:
      return {
        ...state,
        movies: [...state.movies, action.payload],
        err : null
      };
    case DELETED_FROM_WATCHLIST:
      return {
        ...state,
        movies: [
          ...state.movies.filter(movie => movie.imdbID !== action.payload)
        ],err : null
      };
    case FETCHED_USER_WATCHLIST:
      return {
        ...state,
        movies: [...action.payload]
      };
    case FETCHED_USER_WATCHLIST:
      return {
        ...state,
        movies: [...action.payload]
      };
    case "WATCHLIST_ERROR":
      return {
        ...state,
        err: action.payload
      };
    default:
      return state;
  }
};
