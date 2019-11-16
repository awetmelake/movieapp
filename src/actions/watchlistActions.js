//firestore
import { fs } from "../config/fbConfig";

import {
  ADDED_TO_WATCHLIST,
  DELETED_FROM_WATCHLIST,
  FETCHED_USER_WATCHLIST,
  UI_LOADING_INIT,
  UI_LOADING_COMPLETE
} from "./types";

export const addToWatchlist = movie => (dispatch, getState) => {
  const userId = getState().firebase.auth.uid;
  const watchlist = getState().watchlist.movies;

  //conditional dispatch based on if movie item already exists in state
  let alreadyAdded = m => m.imdbID === movie.imdbID;
  if (!watchlist.some(alreadyAdded) && userId) {
    fs.collection("users")
      .doc(userId)
      .collection("watchlist")
      .doc(movie.imdbID)
      .set({
        ...movie
      })
      .then(() => {
        fetchUserWatchlist();
        dispatch({
          type: ADDED_TO_WATCHLIST,
          payload: movie.Title
        });
      });
  }else if (!userId){
    dispatch({type : 'WATCHLIST_ERROR', payload: 'Must be signed in to perform that action'})
  }
};

//delete by movie imdbID
export const delFromWatchlist = imdbID => (dispatch, getState) => {
  const userId = getState().firebase.auth.uid;

  fs.collection("users")
    .doc(userId)
    .collection("watchlist")
    .doc(imdbID)
    .delete()
    .then(() => {
      fetchUserWatchlist();
      dispatch({
        type: DELETED_FROM_WATCHLIST
      });
    });
};

//fetch current user watchlist from firebase cloud because redux firebase ordered object is buggy. storing the data locally allows for easier component rendering as the watchlists items are being changed
export const fetchUserWatchlist = () => (dispatch, getState) => {
  const userId = getState().firebase.auth.uid;
  const authState = getState().firebase.auth.isEmpty;
  let userWatchlist = [];
  //make sure a user is logged in before fetching
  if (!authState) {
    fs.collection("users")
      .doc(userId)
      .collection("watchlist")
      .get()
      .then(async snapshot => {
        await dispatch({
          type: UI_LOADING_INIT
        });
        await snapshot.forEach(doc => {
          userWatchlist.push(doc.data());
        });

        await dispatch({
          type: UI_LOADING_COMPLETE
        });

        await dispatch({
          type: FETCHED_USER_WATCHLIST,
          payload: userWatchlist
        });
      });
  }
};
