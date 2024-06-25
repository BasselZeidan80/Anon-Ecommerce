import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ReactSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div>
          <img className="w-100" src={require('../../assets/images/banner-1.jpg')} alt="" />
        </div>
        <div>
        <img className="w-100" src={require('../../assets/images/banner-2.jpg')} alt="" />
          
        </div>
        <div>
        <img className="w-100" src={require('../../assets/images/banner-3.jpg')} alt="" />

        </div>
       
        
      </Slider>
    </div>
  );
}

export default ReactSlider;
