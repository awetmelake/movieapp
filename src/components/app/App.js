import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { isLoaded } from "react-redux-firebase";


// components
import Nav from "../header/Nav";
import Watchlist from "../watchlist/Watchlist";
import Searchresults from "../search/Searchresults";
import Moviedetails from "../movie/Moviedetails";
import Home from "../home/Home";
import SignIn from "../auth/SignIn";
import SignUp from "../auth/SignUp";
import UserProfile from "../auth/UserProfile";
import LoadingSpinner from "../loading/LoadingSpinner";
import NoMatch from "../NoMatch";

//styles
import "./App.scss";

const App = ({ auth, loading }) => {
  //load page after auth is loaded so no render flicker
  if (!isLoaded(auth)) {
    return <LoadingSpinner />;
  }
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/watchlist" component={Watchlist} />
          <Route path="/log-in" component={SignIn} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/user-profile/:id" component={UserProfile} />
          <Route path="/search-results/:title" component={Searchresults} />
          <Route path="/movie-details/:id" component={Moviedetails} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
};

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  loading: state.ui.isLoading
});

export default connect(
  mapStateToProps,
  {}
)(App);
