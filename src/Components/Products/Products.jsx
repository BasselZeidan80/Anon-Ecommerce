import React, { useContext, useEffect, useState } from "react";
import "../Home/Home.css";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { ColorRing, RotatingLines } from "react-loader-spinner";
import axios from "axios";
import { useQuery } from "react-query";
import StarRating from "../StartRating/StarRating";
import ReactSlider from "../ReactSlider/ReactSlider";
import "./Products.css";
import CategorySlider from "../CategorySlider/CategorySlider";
import { date } from "yup";
import placeHolderImage from "../../assets/images/placeHolderImage.png";
import { CartContext } from "../../Context/CartContext";
import { Bounce, toast } from "react-toastify";
export default function Products() {
  const { searchQuery, setSearchResults, searchResults } = useOutletContext();
  const { addToCart } = useContext(CartContext);
  const [isLoad, setIsLoad] = useState(false);

  async function addProduct(id) {
    setIsLoad(true);
    let response = await addToCart(id);
    console.log("======responseAddToCart ====", response.data.status);
    if (response.data.status == "success") {
      setIsLoad(false);
      toast.success("Product added successfully to your cart!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

      // toast.promise("ssssss");
    } else {
      setIsLoad(false);
      toast.error("Something went wrong!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      // toast.error("Something went wrong");
    }
  }

  // use react query to handle cache data
  const fetchProducts = async () => {
    const res = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products"
    );
    return res.data.data;
  };

  const {
    data: allProducts = [],
    isLoading,
    isError,
  } = useQuery("products", fetchProducts);
  console.log(allProducts);
  // console.log(isError , isLoading ,allProducts);

  // Update search results based on search query

  useEffect(() => {
    if (searchQuery) {
      const results = allProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results.length > 0 ? results : null);
    } else {
      setSearchResults(null);
    }
  }, [searchQuery, allProducts, setSearchResults]);

  // Determine which products to display based on search results or all products
  const productsToShow = searchResults !== null ? searchResults : allProducts;

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
    return <div>Error fetching products</div>;
  }
  return (
    <>
      <div className="container">
        <div className="row my-4">
          <div className="col-md-9">
            <div className="slider">
              <ReactSlider />
            </div>
          </div>
          <div className="col-md-3">
            <div className="SliderImages">
              <div className="image1">
                <img
                  style={{ height: "200px" }}
                  className="w-100"
                  src={require("../../assets/images/blog-1.jpg")}
                  alt=""
                />
              </div>
              <div className="image1">
                <img
                  style={{ height: "200px" }}
                  className="w-100"
                  src={require("../../assets/images/blog-3.jpg")}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>

        <CategorySlider />

        <div className="row mt-3">
          {allProducts.map((ele, idx) => (
            <div
              // onClick={() => navigate(`/ProductDetails/${ele.id}`)}
              key={idx}
              className="col-md-3 col-lg-2 col-sm-12 my-2"
            >
              <div className="product-card">
                <Link to={`/ProductDetails/${ele.id}`}>
                  <div className="product-image">
                    <img
                      src={ele.imageCover || placeHolderImage}
                      className="w-100"
                      alt="Product Image"
                    />
                  </div>
                </Link>
                <div className="product-info">
                  <div className="category">{ele.category.name}</div>
                  <h2 className="title">
                    {ele.title.split(" ").slice(0, 2).join(" ")}
                  </h2>
                  {ele.priceAfterDiscount ? (
                    <>
                      <div className="sale">
                        Sale{" "}
                        {(
                          ((ele.price - ele.priceAfterDiscount) / ele.price) *
                          100
                        ).toFixed(1)}{" "}
                        %
                      </div>
                      <div className="price fs-5">
                        ${ele.priceAfterDiscount} -{" "}
                        <span className="text-decoration-line-through">
                          ${ele.price}
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="price fs-5">${ele.price}</div>
                  )}
                  <StarRating rating={ele.ratingsAverage} />
                  <div className="buttons">
                    <button
                      onClick={() => addProduct(ele.id)}
                      className="add-to-cart"
                    >
                      {isLoad ? (
                        <ColorRing
                          visible={true}
                          height="30"
                          width="80"
                          ariaLabel="color-ring-loading"
                          wrapperStyle={{}}
                          wrapperClass="color-ring-wrapper"
                          colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
                        />
                      ) : (
                        " Add To Cart"
                      )}

                      <i class="fa-solid fa-cart-shopping cartIcon"></i>
                    </button>
                    <button className="add-to-favorite">
                      <i class="fa-solid fa-heart heartIcon"></i>
                    </button>
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
