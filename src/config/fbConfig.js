import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore"; // <- needed if using firestore
import { createFirestoreInstance } from "redux-firestore";
import store from "../store";

const firebaseConfig = {
  apiKey: "AIzaSyBpKByWRKAMlXgYJjgzRw6mt_W-H9otPig",
  authDomain: "moviedb-69b2a.firebaseapp.com",
  databaseURL: "https://moviedb-69b2a.firebaseio.com",
  projectId: "moviedb-69b2a",
  storageBucket: "moviedb-69b2a.appspot.com",
  messagingSenderId: "894724316619",
  appId: "1:894724316619:web:0bc7dd3c68a868cb"
};

//initialize firebase
export const db = firebase.initializeApp(firebaseConfig);
export const fs = firebase.firestore();

const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true
};

export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance // <- needed if using firestore
};
