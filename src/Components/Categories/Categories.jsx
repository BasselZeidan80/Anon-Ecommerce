import React from "react";
import "./Category.css";
import imgee from "../../assets/images/products/3.jpg";
import axios from "axios";
import { useQuery } from "react-query";
import { RotatingLines } from "react-loader-spinner";
import { Link } from "react-router-dom";
const Categories = () => {
  function fetchCategory() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }
  const { data, isLoading, isError } = useQuery("fetchCategory", fetchCategory);

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
  const catData = data.data.data;
  return (
    <div className="container">
      <div className="row">
        {catData.map((item, idx) => (
          <div key={idx} className="col-md-4 col-lg-4 col-lg-3">
            <div className="categories">
              <div className="category">
                <img className="w-100" src={item.image} alt="" />
                <div className="layer">
                  <div className="category-info">
                    <h2>{item.name} </h2>
                    <p>{item.slug} </p>
                    <Link to={`/category/${item._id}/subcategories`}>
                      <button className="ExploreBtn">Explore</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
