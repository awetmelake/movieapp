import React, { Component } from "react";
import Swiper from "swiper";
import "../../styles/carousel.scss";

import poster1 from "../../images/judyposter.jpg";
import poster2 from "../../images/toystory4poster.jpg";

class HeaderSwiper extends Component {
  render() {
    let slider = new Swiper(".swiper-container", {
      direction: "horizontal",
      loop: true,
      width: "100%",
      autoplay: {
        delay: 5000
      }
    });
    return (
      <div className="swiper-container">
        <div className="swiper-wrapper">
          <div className="swiper-slide swiper-slide-1">
          </div>
          <div className="swiper-slide swiper-slide-2">
          </div>
          <div className="swiper-slide swiper-slide-3">
          </div>
        </div>
        <div className="swiper-pagination"></div>

        <div className="swiper-scrollbar"></div>
      </div>
    );
  }
}

export default HeaderSwiper;
