import React, { useState } from "react";
import ReactSlider from "../ReactSlider/ReactSlider";
import CategorySlider from "../CategorySlider/CategorySlider";
import logo from "../../assets/images/banner-1.jpg";
import "./ProductDeatils.css";
import StarRating from "../StartRating/StarRating";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";
import placeHolderImage from "../../assets/images/placeHolderImage.png";

export default function ProductDetails() {
  const [selectImage, setSelectImage] = useState(null);
  const { id } = useParams();
  console.log("===", id);

  //handle image click
  function handleImageClick(img) {
    setSelectImage(img);
  }

  function getProductDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }
  const { data, isLoading, isError } = useQuery(
    `ProductDetails-${id}`,
    getProductDetails
  );
  console.log("data====sss", data);

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
  const Pdetails = data.data.data;

  return (
    <>
      <div className="container vh-100 overflow-hidden d-flex align-items-center justify-content-center">
        <div className="row cardDeatails   w-100  ">
          <div className="col-md-6 col-lg-6 col-sm-12   ">
            <div className="mainImage">
              <img
                className="w-100"
                src={selectImage || Pdetails.imageCover || placeHolderImage}
                alt=""
              />
            </div>
          </div>
          <div className="col-md-6 col-lg-6 col-sm-12 ps-5  ">
            <h2 className="textTitle">
              {Pdetails.title.split(" ").slice(0, 10).join(" ")}
            </h2>
            <div className="line"></div>

            <h3 className="my-5 priceDetails">{Pdetails.price} $</h3>
            <p className="my-3   paragraph">
              {Pdetails.description.split(" ").slice(0, 20).join(" ")}
            </p>
            <span className=" fw-bold d-flex align-items-center justify-content-start ">
              {/* <StarRating />Stars{Pdetails.ratingsAverage} */}
              <StarRating rating={Pdetails.ratingsAverage} />
            </span>
            <div className="d-flex my-4 align-items-center">
              <button className="btnDetails me-3 ">+</button>
              <span class="badge p-2 fs-6  rounded-circle me-3 text-bg-dark">
                1
              </span>
              <button className="btnDetails">-</button>
            </div>
            <button className="  btnDetails mb-5 w-25">Add To Cart</button>
            <p className="fw-bold">More Images:</p>
            <div className="imagesContainer pt-3 ">
              <div className="d-flex align-items-center      ">
                {Pdetails.images.map((img, idx) => (
                  <div
                    onClick={() => handleImageClick(img)}
                    key={idx}
                    id="ImagesDetails"
                    style={{ cursor: "pointer" }}
                    className="image1 w-25 pe-1"
                  >
                    <img
                      className="w-100"
                      src={img || placeHolderImage}
                      alt="catItem"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
