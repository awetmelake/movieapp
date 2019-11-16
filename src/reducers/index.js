import { combineReducers } from "redux";

import searchReducer from "./searchReducer";
import watchlistReducer from "./watchlistReducer";
import movieReducer from "./movieReducer";
import navReducer from "./navReducer";
import authReducer from "./authReducer";
import uiReducer from "./uiReducer";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

export default combineReducers({
  searched: searchReducer,
  watchlist: watchlistReducer,
  movieDetails: movieReducer,
  navState: navReducer,
  auth: authReducer,
  ui: uiReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});
