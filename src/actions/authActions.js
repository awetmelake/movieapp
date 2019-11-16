//firebase
import { db } from "../config/fbConfig";
//firestore
import { fs } from "../config/fbConfig";

import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SIGNOUT_SUCCESS,
  SIGNUP_ERROR,
  SIGNUP_SUCCESS
} from "./types";

export const userSignIn = credentials => (dispatch, getState) => {
  db.auth()
    .signInWithEmailAndPassword(credentials.email, credentials.password)
    .then(() => {
      dispatch({
        type: LOGIN_SUCCESS
      });
    })
    .catch(err => {
      dispatch({
        type: LOGIN_ERROR,
        payload: err
      });
    });
};

export const signOut = () => (dispatch, getState) => {
  db.auth()
    .signOut()
    .then(() => {
      dispatch({
        type: SIGNOUT_SUCCESS
      });
    });
};

export const createAccount = newUser => (dispatch, getState) => {
  if (newUser.userName.length < 5) {
    dispatch({
      type: SIGNUP_ERROR,
      payload: "username must be atleast 5 characters"
    });
  } else if (newUser.password < 5) {
    dispatch({
      type: SIGNUP_ERROR,
      payload: "password must be atleast 5 characters"
    });
  } else if (newUser.password !== newUser.checkPassword) {
    dispatch({
      type: SIGNUP_ERROR,
      payload: "passwords must match"
    });
  } else if (!newUser.email.length) {
    dispatch({
      type: SIGNUP_ERROR,
      payload: "please enter an email"
    });
  } else {
    db.auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then(res =>
        fs
          .collection("users")
          .doc(res.user.uid)
          .set({
            userName: newUser.userName
          })
      )
      .catch(err => {
        dispatch({
          type: SIGNUP_ERROR,
          payload: err
        });
      });
  }
};

export const guestSignIn = () => (dispatch, getState) => {
  db.auth()
    .signInAnonymously()
    .then(() => {
      dispatch({
        type: LOGIN_SUCCESS
      });
    });
};
