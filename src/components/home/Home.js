import React, { Component } from "react";
import { connect } from "react-redux";
import Swiper from "swiper";

// images
import movieIcon from "../../images/movie-icon.jpg";

// components
import HeaderSwiper from "./HeaderSwiper";

import "./Home.scss";
class Home extends Component {
  componentDidMount() {
    const sliderEl = document.querySelector(".swiper-container");
    console.log(sliderEl);
    if (!sliderEl) {
      return;
    }
    var slider = new Swiper(".swiper-container", {
      direction: "horizontal",
      loop: true,

      autoplay: {
        delay: 5000
      }
    });
  }

  render() {
    const { auth, profile } = this.props;
    return (
      <div className="home" data-aos="fade-in">
        <HeaderSwiper />
        <div className="home-header">
          <h1 style={{lineHeight: "60px", fontFamily: 'Lexend Deca'}}>
            <img
              src={movieIcon}
              className="icon movie-icon"
              alt="moviedb icon"
            />
            Movie Database
          </h1>

          {auth.uid && !profile.isEmpty && <h2 style={{fontSize: "1.5em"}}><i>Welcome {profile.userName}</i></h2>}
          {!auth.uid && <h2 style={{fontSize: "1.5em"}}><i>Sign in to get started</i></h2>}
          {auth.uid && profile.isEmpty && <h2 style={{fontSize: "1.5em"}}><i>Logged in a guest</i></h2>}

        </div>

        <div className="home-main">
          <div
            data-aos="fade-in"
            data-aos-duration="2000"
            className="home-search"
          >
            <h1>
              <i>Search your favorite movies and tv shows</i>
            </h1>
            <div className="home-search-main"></div>
          </div>

          <div
            data-aos="fade-in"
            data-aos-duration="2000"
            className="home-watchlist"
          >
            <h1>
              <i>Add them to your watchlist</i>
            </h1>
            <div className="home-watchlist-main"></div>
          </div>

          <div
            data-aos="fade-in"
            data-aos-duration="2000"
            className="home-search"
          >
            <h1>
              <i>
                Find your favorite titles from a database of 1000s of movies, tv
                shows and more{" "}
              </i>
            </h1>
            <div className="home-search-2"></div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile
});

export default connect(
  mapStateToProps,
  {}
)(Home);
