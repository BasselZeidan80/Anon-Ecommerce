import axios from "axios";
import React from "react";
import { RotatingLines } from "react-loader-spinner";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

export default function SubBrands() {
  const { id } = useParams();
  console.log(id);

  function getSubBrands() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
  }
  const { data, isLoading, isError } = useQuery("getSubBrands", getSubBrands);
  //   console.log("data fromSubCat", data);
  console.log(data);

  if (isLoading) {
    return (
      <div className="loader d-flex justify-content-center align-items-center vh-100 opacity-50 ">
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
  if (isError) {
    return <h1>error fetching</h1>;
  }
  return (
    <>
      <div className="container">
        <div className="row">
          {data.data.data.map((item, idx) => (
            <div key={idx} className="col-md-4 col-lg-4 col-lg-3">
              <div className="categories">
                <div className="category">
                  <img className="w-100" src={item.image} alt="" />
                  <div className="layer">
                    <div className="category-info">
                      <h2>{item.name} </h2>
                      <p>{item.slug} </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
