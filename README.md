# MOVIE DB
React application that uses the Open Movie Database Api to let users search from 1000's of media titles. Search movies, tv-shows, and games. Click on posters to be taken to details page where the title's information such as plot and imbd rating is displayed. Users can add and remove titles from their watchlist when signed in. Changes are updated live with Cloud Firestore. Uses Firebase for authentication and Firestore for storing users movie collections. React router handles routing and 404 pages. Redux used for state management.

# How to run the app 
1. Fork/clone repo
2. Install dependencies with "npm install" from within the root
3. Create a folder 'config' in /src with a file 'fbConfig.js' and put your firebase configuration data in there, see Firebase console for more info. Connect your Redux store to your firebase app.
#### src/config/fbConfig.js :
```
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore"; // <- needed if using firestore
import { createFirestoreInstance } from "redux-firestore";
import store from "../store";

var firebaseConfig = {
// Your web app's Firebase configuration here, from firebase console
};

// Initialize Firebase
export const fb = firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();

const rrfConfig = {
  userProfile: "users", //Pass in the collection where user data is stored, change to which ever collection you use
  useFirestoreForProfile: true 
};

export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance // <- needed if using firestore
};
```
 Move CRUD operations to the back-end using Express to call Firebase functions if you want a more secure setup.
 
4. Set up your collections, enable authorization within your firebase console. Set them up how ever you like and change the CRUD actions within src/actions to match
 #### Your database should look like this:
 ```
 collection: users
  document: userId
    collection: watchlist
      document: movieId
        
  document: user2
    ...
  ```
5. Run 'npm start', Have fun :)

## Dependencies
* React
* Redux
* Redux-thunk
* React Redux Firebase
* Redux Firestore
* Firebase
* React Router
* Animate.css
* Node Sass

## What the app looks like 
![alt text](https://awettech.com/images/moviedb.webp)
