import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from "react-query";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";
import placeHolderImage from "../../assets/images/placeHolderImage.png";

function CategorySlider() {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  async function CategoryData() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  const { data, isLoading } = useQuery("CategorySlider", CategoryData);

  if (isLoading) {
    return (
      <div className="loader d-flex justify-content-center align-items-center vh-100 opacity-50 bg-primary">
        <RotatingLines
          visible={true}
          height="96"
          width="96"
          color="grey"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
        />
      </div>
    );
  }

  const originalData = data.data.data;
  const reversedData = [...originalData].reverse();

  return (
    <>
      <div className="slider-container  ">
        <Slider {...settings}>
          {originalData.map((category, idx) => (
            <div key={idx}>
              <img
                style={{ height: "150px", objectFit: "cover" }}
                className="w-100"
                src={category.image || placeHolderImage}
                alt={category.name}
              />
            </div>
          ))}
        </Slider>

        <Slider {...settings}>
          {reversedData.map((category, idx) => (
            <div key={idx}>
              <img
                style={{ height: "150px", objectFit: "cover" }}
                className="w-100"
                src={category.image}
                alt={category.name}
              />
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}

export default CategorySlider;
