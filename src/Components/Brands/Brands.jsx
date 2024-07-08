import React, { useEffect, useState } from "react";
import axios from "axios";
import { Circles } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

export default function Brands() {
  async function getBrands() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }

  const { isError, isLoading, isFetching, data } = useQuery(
    "getAllBrands",
    getBrands
  );

  if (isLoading) {
    return (
      <div className="d-flex vh-100 bg-opacity-50 justify-content-center align-items-center">
        <Circles
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }

  return (
    <>
      <div className="container">
        <div className="row">
          {data.data.data.map((category, idx) => (
            <div key={idx} className="col-md-3 ccat">
              <div className="category text-center mt-3 p-3">
                <figure className="image">
                  <img
                    src={category.image}
                    className="w-100"
                    alt={category.name}
                  />
                  <div className="layer rounded-4 d-flex align-items-center justify-content-between  fw-bold flex-column">
                    <h3 className="text-dark fw-bold "></h3>
                    <Link to={`/SubBrands/${category._id}`}>
                      <button className="ExploreBtn mb-3">Explore</button>
                    </Link>
                  </div>
                </figure>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
