import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

//actions
import { toggleNav } from "../../actions/navActions";
import { signOut } from "../../actions/authActions";
import { fetchUserWatchlist } from "../../actions/watchlistActions";

//components
import Searchbar from "../search/Searchbar.js";
import SignedInLinks from "./SignedInLinks.js";
import SignedOutLinks from "./SignedOutLinks.js";

//icons
import showMoreIcon from "../../images/round-menu-24px.svg";
import closeIcon from "../../images/round-close-24px.svg";
import homeIcon from "../../images/round-home-24px.svg";
import movieIcon from "../../images/movie-icon.jpg";

//styles
import "./Nav.scss";

class Nav extends Component {
  componentDidMount() {
    this.props.fetchUserWatchlist();
  }

  handleToggleNav = () => {
    this.props.toggleNav();
  };

  handlelogOut = () => {
    this.props.signOut();
  };

  render() {
    const { fullNav, auth, profile } = this.props;
    const links = auth.uid ? (
      <SignedInLinks profile={profile} handlelogOut={this.handlelogOut} />
    ) : (
      <SignedOutLinks />
    );

    return (
      <nav
        aos-data="fade-in"
        className={`main-nav main-nav${fullNav ? "-show " : "-hide "}`}
        style={{fontFamily: "Lexend Deca"}}
      >
        <header>
          <Link to="/">
          <img src={movieIcon} className="icon movie-icon"  alt="" />
            MovieDB
          </Link>
        </header>

        <Link to="/" className="home-icon">
        <img src={movieIcon} className="icon movie-icon" />
        </Link>

        <Searchbar />

        {links}

        <img
          className="close-nav-icon icon"
          src={closeIcon}
          onClick={e => this.handleToggleNav()}
          alt=""
        ></img>
        <img
          className="show-nav-icon icon"
          src={showMoreIcon}
          onClick={e => this.handleToggleNav()}
          alt=""
        ></img>

        <div
          className={`nav-bottom-section nav-bottom-section${
            fullNav ? "-show" : "-hide"
          }`}
        >
          {links}
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  fullNav: state.navState.full,
  auth: state.firebase.auth,
  profile: state.firebase.profile
});

export default connect(
  mapStateToProps,
  { toggleNav, signOut, fetchUserWatchlist }
)(Nav);
