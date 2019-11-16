import {
  FETCHED_MOVIE_DETAILS,
  ADDED_TO_WATCHLIST,
  DELETED_FROM_WATCHLIST
} from "../actions/types";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCHED_MOVIE_DETAILS:
      return {
        ...action.payload
      };
    case ADDED_TO_WATCHLIST:
      return {
        ...state,
        watchlist: true
      };
    case DELETED_FROM_WATCHLIST:
      return {
        ...state,
        watchlist: false
      };
    default:
      return state;
  }
};
