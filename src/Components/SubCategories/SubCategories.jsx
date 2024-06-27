import axios from "axios";
import React from "react";
import { RotatingLines } from "react-loader-spinner";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import "./SubCategory.css";
export default function SubCategories() {
  const { id } = useParams();
  console.log("====", id);

  function fetchSucCategory() {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`
    );
  }
  const { data, isLoading, isError } = useQuery(
    "fetchSucCategory",
    fetchSucCategory
  );
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
  if (isError) {
    return <h1>error</h1>;
  }
  return (
    <>
      <div className="container">
        <div className="row">
          {data.data.data.map((ele, idx) => (
            <div key={idx} className="navigation-tips-container">
              <div className="tip">
                <div className="icon">
                  <i className="fa fa-paper-plane"></i>
                </div>
                <div className="text">
                  <h3>{ele.name}</h3>
                  <p>{ele.slug}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
